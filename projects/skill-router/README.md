# Skill Router

Route a request to a skill using explainable keyword scores, path rules, permission gates, and dependency ordering.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py skill-router --init learning-artifacts/skill-router
python3 scripts/project_test.py skill-router --path learning-artifacts/skill-router
cd projects/skill-router/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Parse a typed skill catalog](stages/01-catalog/docs/en.md)
2. [Score words and repository paths](stages/02-score/docs/en.md)
3. [Resolve dependencies before execution](stages/03-dependencies/docs/en.md)
4. [Abstain on ambiguous or blocked requests](stages/04-route/docs/en.md)

## Primary sources

- [Agent Skills specification](https://agentskills.io/specification)
- [Node path API](https://nodejs.org/api/path.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
