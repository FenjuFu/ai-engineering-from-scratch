from pathlib import Path
import os
import re
import stat
import subprocess
import sys
import tempfile


def safe_path(workspace, relative):
    root = Path(workspace).resolve()
    candidate = Path(relative)
    if candidate.is_absolute() or ".." in candidate.parts:
        raise ValueError("relative workspace path required")
    target = (root / candidate).resolve()
    if not target.is_relative_to(root) or not target.is_file():
        raise ValueError("workspace file required")
    return target


def apply_patch(workspace, relative, old, new):
    target = safe_path(workspace, relative)
    if not isinstance(old, str) or not old or (not isinstance(new, str)):
        raise ValueError("nonempty old text and string replacement required")
    content = target.read_text()
    if content.count(old) != 1:
        raise ValueError("patch must match exactly once")
    permissions = stat.S_IMODE(target.stat().st_mode)
    with tempfile.NamedTemporaryFile("w", dir=target.parent, delete=False) as temporary:
        temporary.write(content.replace(old, new, 1))
        name = temporary.name
    try:
        os.chmod(name, permissions)
        os.replace(name, target)
    finally:
        if os.path.exists(name):
            os.unlink(name)
    return {"path": relative, "replacements": 1}


def run_tests(workspace, timeout=5):
    root = Path(workspace).resolve()
    if not isinstance(timeout, (int, float)) or timeout <= 0:
        raise ValueError("positive timeout required")
    if not (root / "tests").is_dir():
        return {
            "state": "failed",
            "passed": False,
            "tests": 0,
            "output": "missing tests directory",
        }
    env = {**os.environ, "PYTHONDONTWRITEBYTECODE": "1", "PYTHONPATH": str(root)}
    try:
        result = subprocess.run(
            [sys.executable, "-B", "-m", "unittest", "discover", "-s", "tests"],
            cwd=root,
            env=env,
            stdin=subprocess.DEVNULL,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
    except subprocess.TimeoutExpired:
        return {
            "state": "timeout",
            "passed": False,
            "tests": 0,
            "output": "test time budget exhausted",
        }
    output = result.stdout + result.stderr
    summary = re.search(
        r"^Ran (\d+) tests? in [^\n]+\n\n"
        r"(OK|FAILED|NO TESTS RAN)(?: \(([^\n]*)\))?\s*\Z",
        result.stderr,
        re.MULTILINE,
    )
    tests = int(summary.group(1)) if summary else 0
    skipped = (
        re.search(r"\bskipped=(\d+)\b", summary.group(3) or "") if summary else None
    )
    passed = bool(
        result.returncode == 0
        and summary
        and summary.group(2) == "OK"
        and tests > 0
        and not (skipped and int(skipped.group(1)) > 0)
    )
    return {
        "state": "passed" if passed else "failed",
        "passed": passed,
        "tests": tests,
        "output": output,
    }


def agent_loop(workspace, actions, max_steps=6):
    if not isinstance(max_steps, int) or max_steps < 1:
        raise ValueError("positive step budget required")
    trace = []
    for action in actions[:max_steps]:
        try:
            if action.get("tool") == "patch":
                result = apply_patch(
                    workspace, action["path"], action["old"], action["new"]
                )
            elif action.get("tool") == "test":
                result = run_tests(workspace)
            else:
                raise ValueError("unknown tool")
        except (ValueError, KeyError, OSError) as error:
            trace.append({"tool": action.get("tool"), "error": str(error)})
            return {"state": "failed", "trace": trace}
        trace.append({"tool": action["tool"], "result": result})
        if action["tool"] == "test" and result["passed"]:
            return {"state": "completed", "trace": trace}
    return {
        "state": "budget_exhausted" if len(actions) >= max_steps else "failed",
        "trace": trace,
    }
