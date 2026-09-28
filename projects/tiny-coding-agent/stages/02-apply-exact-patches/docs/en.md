# Apply exact patches with preconditions

> Replace one exact occurrence and preserve the file on missing or ambiguous matches..

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `apply_patch` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A patch is an assertion about the current file, not a blind instruction to overwrite it. Require the old text to appear exactly once. If the model guessed stale code or an ambiguous snippet, reject the patch and preserve the file.

Write the replacement to a temporary file in the same directory, preserve the target's permission bits, then atomically replace the target. This avoids leaving a half-written source file if the process fails while writing and keeps executable scripts executable.

```figure
pj-tiny-coding-agent-2
```

## Predict first

Should an old-text snippet appearing twice modify both copies?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `apply_patch` in `main.py` in your learner workspace. Replace one exact occurrence and preserve the file on missing or ambiguous matches.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py tiny-coding-agent --init my-tiny-coding-agent
python3 scripts/project_test.py tiny-coding-agent --stage 2 --path my-tiny-coding-agent
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

A unique return expression changes once. Ambiguous patches fail without edits.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/tiny-coding-agent/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://docs.python.org/3/library/subprocess.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
