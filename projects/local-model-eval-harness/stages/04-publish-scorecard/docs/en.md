# Publish accuracy and latency together

> Combine metrics with nearest-rank latency percentiles and a measurement-source label..

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `scorecard` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Quality and latency measure different tradeoffs. Use nearest-rank percentiles so the definition is reproducible on small samples. Report p50 and p95 alongside accuracy, coverage, calibration, and number of measured predictions.

The included demo uses explicitly synthetic recorded latencies, not timing claims about any local model. Substitute real measurements before making a performance decision.

```figure
pj-local-model-eval-harness-4
```

## Predict first

Can a low p95 from two requests support a latency guarantee?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `scorecard` in `main.py` in your learner workspace. Combine metrics with nearest-rank latency percentiles and a measurement-source label.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py local-model-eval-harness --init my-local-model-eval-harness
python3 scripts/project_test.py local-model-eval-harness --stage 4 --path my-local-model-eval-harness
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The output labels its synthetic cassette and reports all metric denominators.

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
