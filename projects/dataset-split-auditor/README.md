# Dataset Split Auditor

Detect duplicate and group leakage before you trust an evaluation score. Produce deterministic group-preserving train and test splits.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py dataset-split-auditor --init my-dataset-split-auditor
python3 scripts/project_test.py dataset-split-auditor --stage 1 --path my-dataset-split-auditor
python3 scripts/project_test.py dataset-split-auditor --all --solution --strict
cd projects/dataset-split-auditor/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Fingerprint normalized records](stages/01-fingerprint-records/docs/en.md)
2. [Audit duplicate and group leakage](stages/02-audit-leakage/docs/en.md)
3. [Split groups with stable hashing](stages/03-split-groups/docs/en.md)
4. [Report split size and leakage together](stages/04-report-distribution/docs/en.md)

## Primary reference

[Mechanism and API reference](https://scikit-learn.org/stable/common_pitfalls.html). Original implementation and fixtures.
