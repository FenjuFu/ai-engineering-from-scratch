# Schedule within cost and time limits

> Schedule known job estimates under integer cost and millisecond limits.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `schedule` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A bounded agent needs more than a money counter. Apply a deadline and a cost limit before each sequential job, then append an explicit completed or rejected event. Test deterministic durations rather than sleeping.

This is a simulator for admission decisions, clearly separated from execution. The JSON trace lets you inspect which constraint rejected each job. It is not a benchmark of model latency.

```figure
pj-agent-budget-planner-4
```

## Predict first

Can a cheap request still be rejected when no deadline remains?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `schedule` in `main.py` in your learner workspace. Schedule known job estimates under integer cost and millisecond limits. Return named outcomes and a final ledger.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py agent-budget-planner --init my-agent-budget-planner
python3 scripts/project_test.py agent-budget-planner --stage 4 --path my-agent-budget-planner
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The trace distinguishes budget rejection from deadline rejection.

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
