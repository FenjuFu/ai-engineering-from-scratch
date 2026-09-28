# Settle actual usage and release unused budget

> Settle each request exactly once with actual cost no greater than its reservation.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `settle` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A reservation is a ceiling, not an invoice. When a request finishes, remove its hold and add actual spending. On cancellation, release the hold with zero spending.

A reported actual cost above the reservation is an accounting violation. Preserve the old ledger and raise an error so the caller can reconcile rather than silently producing a negative balance.

```figure
pj-agent-budget-planner-3
```

## Predict first

What happens when a provider reports more tokens than the reserved ceiling?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `settle` in `main.py` in your learner workspace. Settle each request exactly once with actual cost no greater than its reservation. Preserve input state on error.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py agent-budget-planner --init my-agent-budget-planner
python3 scripts/project_test.py agent-budget-planner --stage 3 --path my-agent-budget-planner
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

A 50-unit reservation settled at 30 releases 20 units for later work.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/agent-budget-planner/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://docs.python.org/3/library/decimal.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
