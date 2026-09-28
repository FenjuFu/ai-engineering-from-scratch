# Multi-Agent Code Review Panel

Run independent reviewer functions with cost reservations and deadlines, verify evidence, and expose agreement without double-counting one reviewer.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py multi-agent-code-review-panel --init learning-artifacts/multi-agent-code-review-panel
python3 scripts/project_test.py multi-agent-code-review-panel --path learning-artifacts/multi-agent-code-review-panel
cd projects/multi-agent-code-review-panel/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Validate reviewer evidence](stages/01-evidence/docs/en.md)
2. [Aggregate independent support](stages/02-agreement/docs/en.md)
3. [Reserve costs and enforce deadlines](stages/03-budgets/docs/en.md)
4. [Measure panel precision and recall](stages/04-evaluate/docs/en.md)

## Primary sources

- [AbortController in Node](https://nodejs.org/api/globals.html#class-abortcontroller)
- [Node test runner](https://nodejs.org/api/test.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
