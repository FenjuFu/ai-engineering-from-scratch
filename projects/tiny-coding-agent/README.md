# Tiny Coding Agent

Build a bounded coding loop that applies exact patches to a disposable workspace and runs its real tests through an allowlisted tool contract.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py tiny-coding-agent --init my-tiny-coding-agent
python3 scripts/project_test.py tiny-coding-agent --stage 1 --path my-tiny-coding-agent
python3 scripts/project_test.py tiny-coding-agent --all --solution --strict
cd projects/tiny-coding-agent/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Confine file tools to a workspace](stages/01-confine-paths/docs/en.md)
2. [Apply exact patches with preconditions](stages/02-apply-exact-patches/docs/en.md)
3. [Run real tests through one allowed command](stages/03-run-real-tests/docs/en.md)
4. [Stop the coding loop on evidence or budget](stages/04-bound-the-loop/docs/en.md)

## Primary reference

[Mechanism and API reference](https://docs.python.org/3/library/subprocess.html). Original implementation and fixtures.
