# Measure normalized exact-answer accuracy

> Return correct, total, accuracy, and coverage against a complete label mapping..

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `accuracy` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Exact-answer matching is appropriate for constrained outputs such as labels and short reference answers. Normalize case and whitespace only; do not remove facts or punctuation to inflate a score.

Require one prediction per labeled item and reject unknown ids. Missing predictions count as incorrect in the denominator. The coverage metric reveals how much of the dataset was actually attempted.

```figure
pj-local-model-eval-harness-2
```

## Predict first

If the model answers only one easy question correctly, should accuracy be 100 percent?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `accuracy` in `main.py` in your learner workspace. Return correct, total, accuracy, and coverage against a complete label mapping.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py local-model-eval-harness --init my-local-model-eval-harness
python3 scripts/project_test.py local-model-eval-harness --stage 2 --path my-local-model-eval-harness
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

One correct answer out of two labels gives accuracy .5 and coverage .5.

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
