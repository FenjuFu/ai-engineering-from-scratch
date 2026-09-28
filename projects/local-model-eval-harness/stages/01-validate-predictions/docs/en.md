# Validate prediction records

> Validate unique ids, string answers, confidence in [0,1], and nonnegative latency_ms..

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `validate` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A prediction record is evidence: id, answer, confidence, and measured latency. Require unique ids and finite numbers. NaN can otherwise slip past comparisons and turn a failure into an apparently valid report.

The harness consumes recordings so every metric test runs without a model. To evaluate a real local model, record its responses in the same contract and keep the execution environment beside the resulting JSON.

```figure
pj-local-model-eval-harness-1
```

## Predict first

Will NaN pass a simple greater-than-zero check?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `validate` in `main.py` in your learner workspace. Validate unique ids, string answers, confidence in [0,1], and nonnegative latency_ms.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py local-model-eval-harness --init my-local-model-eval-harness
python3 scripts/project_test.py local-model-eval-harness --stage 1 --path my-local-model-eval-harness
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

Invalid confidence and latency fail before aggregation.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/local-model-eval-harness/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://docs.python.org/3/library/statistics.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
