# Reserve capacity before dispatch

> Return a new ledger with a unique request reservation.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `reserve` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Checking available budget without reserving it allows multiple queued requests to spend the same capacity. Store reservations separately from settled spending. A new request must fit after both quantities are counted.

This single-process state machine teaches the invariant. It does not claim distributed concurrency safety. A service version needs an atomic transaction or lock around this exact transition.

```figure
pj-agent-budget-planner-2
```

## Predict first

If two requests each need 60 units from a 100-unit budget, can both be admitted?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `reserve` in `main.py` in your learner workspace. Return a new ledger with a unique request reservation. Reject duplicate ids, invalid amounts, and overspending.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py agent-budget-planner --init my-agent-budget-planner
python3 scripts/project_test.py agent-budget-planner --stage 2 --path my-agent-budget-planner
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The first request reserves capacity and the second fails before dispatch.

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
