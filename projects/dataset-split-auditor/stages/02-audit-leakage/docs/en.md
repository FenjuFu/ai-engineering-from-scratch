# Audit duplicate and group leakage

> Validate ids, text, and groups, then report intersections across train and test..

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `audit` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Content leakage and group leakage are different. Two distinct support messages from the same incident can leak the answer even when their text differs. Track both normalized content hashes and group ids across partitions.

Return the colliding hashes and group names, not just a percentage. The reviewer needs to locate the records. Reject duplicate record ids because they make that evidence ambiguous.

```figure
pj-dataset-split-auditor-2
```

## Predict first

Can two records have no common words and still leak through an incident group?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `audit` in `main.py` in your learner workspace. Validate ids, text, and groups, then report intersections across train and test.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py dataset-split-auditor --init my-dataset-split-auditor
python3 scripts/project_test.py dataset-split-auditor --stage 2 --path my-dataset-split-auditor
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The report contains separate content_leaks and group_leaks lists.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/dataset-split-auditor/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://scikit-learn.org/stable/common_pitfalls.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
