"""Execute a validated read-only plan against local recordings or explicit AWS CLI reads."""

import argparse
import json
import subprocess
from pathlib import Path
from plan import validate_plan
from executor import execute
from retry import cached_read


def aws_arguments(operation, resource, config):
    entry = config[resource]
    common = ["aws", "--region", entry["region"], "--output", "json", "--no-cli-pager"]
    if operation == "inventory.list":
        return common + [
            "ecs",
            "describe-services",
            "--cluster",
            entry["cluster"],
            "--services",
            resource,
        ]
    if operation == "logs.read":
        return common + [
            "logs",
            "filter-log-events",
            "--log-group-name",
            entry["log_group"],
            "--limit",
            "20",
        ]
    if operation == "metrics.read":
        return common + [
            "cloudwatch",
            "get-metric-statistics",
            "--namespace",
            "AWS/ECS",
            "--metric-name",
            "CPUUtilization",
            "--dimensions",
            "Name=ClusterName,Value=" + entry["cluster"],
            "Name=ServiceName,Value=" + resource,
            "--start-time",
            entry["start"],
            "--end-time",
            entry["end"],
            "--period",
            "60",
            "--statistics",
            "Average",
        ]
    raise ValueError("unknown read operation")


def run(payload, provider):
    plan = validate_plan(payload["plan"], payload["scope"])
    cache, receipts = {}, []

    def read(operation, resource):
        receipt = cached_read(
            operation, resource, provider, cache, retries=payload.get("retries", 1)
        )
        receipts.append(
            {
                "operation": operation,
                "resource": resource,
                "cached": receipt["cached"],
                "attempts": receipt["attempts"],
            }
        )
        return receipt["value"]

    result = execute(
        plan,
        read,
        max_steps=payload.get("max_steps", 5),
        max_chars=payload.get("max_chars", 4000),
    )
    return {"schema_version": 1, **result, "receipts": receipts}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("--mode", choices=["recording", "aws"], default="recording")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    payload = json.loads(args.input.read_text())

    def provider(operation, resource):
        if args.mode == "recording":
            return payload["recordings"][resource][operation]
        try:
            response = subprocess.run(
                aws_arguments(operation, resource, payload["aws"]),
                check=True,
                capture_output=True,
                text=True,
                timeout=10,
            )
        except subprocess.TimeoutExpired as error:
            raise TimeoutError("AWS read exceeded ten seconds") from error
        if len(response.stdout) > 1000000:
            raise ValueError("AWS response exceeds one megabyte")
        return json.loads(response.stdout)

    result = run(payload, provider)
    result["mode"] = args.mode
    text = json.dumps(result, indent=2)
    if args.output:
        args.output.write_text(text + "\n")
    print(text)


if __name__ == "__main__":
    main()
