"""Send versioned JSON requests through the bounded Rust action loop."""

import argparse, json, subprocess, tempfile
from pathlib import Path

TOOLS = {
    "read": {
        "type": "object",
        "required": ["path"],
        "properties": {"path": {"type": "string"}},
    },
    "list": {"type": "object", "properties": {"path": {"type": "string"}}},
    "search": {
        "type": "object",
        "required": ["path", "pattern"],
        "properties": {"path": {"type": "string"}, "pattern": {"type": "string"}},
    },
    "help": {"type": "object"},
    "pwd": {"type": "object"},
    "quit": {"type": "object"},
}


def encode(request):
    if not isinstance(request.get("id"), str) or not request["id"]:
        raise ValueError("request id required")
    tool = request.get("tool")
    args = request.get("arguments", {})
    if tool not in TOOLS or not isinstance(args, dict):
        raise ValueError("known tool and object arguments required")
    for value in args.values():
        if not isinstance(value, str) or any(ord(c) < 32 for c in value):
            raise ValueError("string arguments without control characters required")
    if tool == "search":
        return f"search {args['pattern']}\t{args['path']}"
    if tool in ("read", "list"):
        return f"{tool} {args.get('path', '.')}"
    if args:
        raise ValueError("tool takes no arguments")
    return tool


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("workspace")
    parser.add_argument("requests")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--out")
    args = parser.parse_args()
    rows = [
        json.loads(line)
        for line in Path(args.requests).read_text().splitlines()
        if line.strip()
    ]
    if len({row.get("id") for row in rows}) != len(rows):
        raise ValueError("duplicate request id")
    commands = [encode(row) for row in rows]
    with tempfile.TemporaryDirectory(prefix="rust-shell-private-") as folder:
        binary = Path(folder) / "shell"
        subprocess.run(
            [
                "rustc",
                "--edition=2021",
                str(Path(__file__).with_name("main.rs")),
                "-o",
                str(binary),
            ],
            check=True,
            capture_output=True,
            text=True,
        )
        run = subprocess.run(
            [str(binary), args.workspace, str(args.limit)],
            input="\n".join(commands) + "\n",
            capture_output=True,
            text=True,
            timeout=30,
        )
        if run.returncode:
            raise ValueError(run.stderr.strip())
        events = [
            {"schema_version": 1, "request_id": request["id"], **json.loads(event)}
            for request, event in zip(rows, run.stdout.splitlines())
        ]
    payload = (
        "\n".join(json.dumps(event, ensure_ascii=False) for event in events) + "\n"
    )
    if args.out:
        Path(args.out).write_text(payload)
    print(payload, end="")


if __name__ == "__main__":
    main()
