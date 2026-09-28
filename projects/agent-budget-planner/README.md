# Agent Budget Planner

Reserve integer token and latency budgets before work starts, settle actual usage, and retain a trace of rejected and completed requests.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py agent-budget-planner --init my-agent-budget-planner
python3 scripts/project_test.py agent-budget-planner --stage 1 --path my-agent-budget-planner
python3 scripts/project_test.py agent-budget-planner --all --solution --strict
cd projects/agent-budget-planner/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Estimate requests in integer microcredits](stages/01-estimate-cost/docs/en.md)
2. [Reserve capacity before dispatch](stages/02-reserve-capacity/docs/en.md)
3. [Settle actual usage and release unused budget](stages/03-settle-and-release/docs/en.md)
4. [Schedule within cost and time limits](stages/04-schedule-under-deadlines/docs/en.md)

## Primary reference

[Mechanism and API reference](https://docs.python.org/3/library/decimal.html). Original implementation and fixtures.
