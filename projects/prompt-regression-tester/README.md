# Prompt Regression Tester

Compare prompt revisions on recorded responses with explicit checks, paired regressions, and a reproducible release gate.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py prompt-regression-tester --init my-prompt-regression-tester
python3 scripts/project_test.py prompt-regression-tester --stage 1 --path my-prompt-regression-tester
python3 scripts/project_test.py prompt-regression-tester --all --solution --strict
cd projects/prompt-regression-tester/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Validate cases before scoring](stages/01-validate-cases/docs/en.md)
2. [Score recorded outputs without a model](stages/02-score-recordings/docs/en.md)
3. [Compare the same cases across revisions](stages/03-pair-revisions/docs/en.md)
4. [Gate releases on explicit tolerances](stages/04-gate-releases/docs/en.md)

## Primary reference

[Mechanism and API reference](https://docs.python.org/3/library/difflib.html). Original implementation and fixtures.
