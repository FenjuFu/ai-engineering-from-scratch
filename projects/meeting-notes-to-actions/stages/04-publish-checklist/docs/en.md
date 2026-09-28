# Publish an escaped HTML checklist and summary

> Return HTML and counts for ready, review, and overdue actions.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `publish` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A checklist becomes useful when it is readable and reviewable outside the parser. Validate source line citations before rendering owners, dates, tasks, and source lines into HTML, escaping every rendered field. Mark overdue items only relative to an explicit supplied date.

The HTML is a static review artifact. It sends no messages and creates no tasks in other systems. Its counters separate ready actions, incomplete actions, and overdue actions so the reader can prioritize review.

```figure
pj-meeting-notes-to-actions-4
```

## Predict first

Could a pasted task containing a script tag execute in the exported report?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `publish` in `main.py` in your learner workspace. Return HTML and counts for ready, review, and overdue actions. Escape markup in names and task text.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py meeting-notes-to-actions --init my-meeting-notes-to-actions
python3 scripts/project_test.py meeting-notes-to-actions --stage 4 --path my-meeting-notes-to-actions
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The demo writes actions.html and prints counts with exact source lines.

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
