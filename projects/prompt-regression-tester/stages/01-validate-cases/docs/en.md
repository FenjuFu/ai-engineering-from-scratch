# Validate cases before scoring

> Validate unique case ids, prompts, and supported checks: contains, excludes, and json..

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `validate_cases` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

An evaluation case needs a stable id, a prompt, and a small set of assertions. Duplicate ids silently overwrite evidence when results become a dictionary. Validate ids and assertion types before replaying any responses.

Assertions here are literal text checks and JSON syntax checks. They are useful for contract drift, but cannot prove factual correctness or tone. Separate those limitations from what your gate actually enforces.

```figure
pj-prompt-regression-tester-1
```

## Predict first

Should a misspelled check silently pass?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `validate_cases` in `main.py` in your learner workspace. Validate unique case ids, prompts, and supported checks: contains, excludes, and json.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py prompt-regression-tester --init my-prompt-regression-tester
python3 scripts/project_test.py prompt-regression-tester --stage 1 --path my-prompt-regression-tester
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

A contains check is accepted; an unknown check kind raises ValueError.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/prompt-regression-tester/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://docs.python.org/3/library/difflib.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
