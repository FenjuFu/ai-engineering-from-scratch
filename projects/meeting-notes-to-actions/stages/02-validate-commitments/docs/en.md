# Validate owners and calendar dates

> Validate owner, task, and ISO date.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `validate_action` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

An action list is operational data. Reject impossible calendar dates rather than accepting a shape that merely resembles a date. A missing owner or date is not a parser crash; it is a review flag.

Use the literal ? marker for unknown fields. This keeps uncertainty visible in structured output. Date parsing uses ISO calendar dates without inventing a timezone for all-day commitments.

Require source citations to be a nonempty list of positive integers. Reject booleans even though Python treats them as integers. Invalid or missing citations cannot become trustworthy evidence in the published checklist.

```figure
pj-meeting-notes-to-actions-2
```

## Predict first

Is 2026-02-30 a valid deadline because it matches the date regex?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `validate_action` in `main.py` in your learner workspace. Validate owner, task, and ISO date. Return review flags for unknown owner/date and reject impossible dates.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py meeting-notes-to-actions --init my-meeting-notes-to-actions
python3 scripts/project_test.py meeting-notes-to-actions --stage 2 --path my-meeting-notes-to-actions
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

Unknown fields create needs_owner or needs_date; invalid calendar dates raise ValueError.

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
