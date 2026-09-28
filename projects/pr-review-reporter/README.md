# PR Review Reporter

Parse real unified diffs in Python, anchor TypeScript review findings to added lines, and publish an escaped local report.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py pr-review-reporter --init learning-artifacts/pr-review-reporter
python3 scripts/project_test.py pr-review-reporter --path learning-artifacts/pr-review-reporter
cd projects/pr-review-reporter/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Recover new-file line numbers](stages/01-diff-lines/docs/en.md)
2. [Generate narrow review candidates](stages/02-inspect/docs/en.md)
3. [Verify and merge findings](stages/03-anchors/docs/en.md)
4. [Publish a local escaped report](stages/04-report/docs/en.md)

## Primary sources

- [Git diff format](https://git-scm.com/docs/diff-format)
- [Python subprocess and JSON](https://docs.python.org/3/library/json.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
