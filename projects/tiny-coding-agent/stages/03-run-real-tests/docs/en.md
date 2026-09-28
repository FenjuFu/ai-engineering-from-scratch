# Run real tests through one allowed command

> Run unittest discovery in the workspace and report passed, tests, output, and a terminal state.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `run_tests` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

The test tool owns its argv. Model text never becomes a shell command. Run the current Python interpreter with unittest discovery, disable interactive stdin, capture output, and enforce a timeout.

A zero-test run or a suite with skipped tests is a failure even when unittest exits zero. Read the final unittest summary from stderr; text printed by a fixture to stdout is not runner evidence. The tool executes trusted Python, so path confinement alone is not an OS security boundary.

```figure
pj-tiny-coding-agent-3
```

## Predict first

Is exit code zero enough when no tests were discovered?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `run_tests` in `main.py` in your learner workspace. Run unittest discovery in the workspace and report passed, tests, output, and a terminal state. Reject missing tests and bound execution time.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py tiny-coding-agent --init my-tiny-coding-agent
python3 scripts/project_test.py tiny-coding-agent --stage 3 --path my-tiny-coding-agent
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The failing fixture returns a failed state; after the patch it returns passed with one test.

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
