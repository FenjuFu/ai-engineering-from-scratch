# Deduplicate exact commitments without losing citations

> Merge exact normalized duplicates and sort provenance line numbers.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `deduplicate` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Repeated notes can duplicate a task. Group by normalized owner, due date, and normalized task text, then merge all source line numbers. Two people assigned the same task are still two commitments.

This is exact normalization, not semantic deduplication. Avoid merging paraphrases automatically because their deadlines or scope may differ. Human review is safer than quietly deleting a distinct obligation.

```figure
pj-meeting-notes-to-actions-3
```

## Predict first

Do two identical tasks with different due dates represent one commitment?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `deduplicate` in `main.py` in your learner workspace. Merge exact normalized duplicates and sort provenance line numbers. Preserve different owners or dates.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py meeting-notes-to-actions --init my-meeting-notes-to-actions
python3 scripts/project_test.py meeting-notes-to-actions --stage 3 --path my-meeting-notes-to-actions
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

A repeated action appears once with both source line numbers.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/meeting-notes-to-actions/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://docs.python.org/3/library/datetime.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
