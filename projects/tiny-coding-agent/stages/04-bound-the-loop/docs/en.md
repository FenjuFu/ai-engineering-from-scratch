# Stop the coding loop on evidence or budget

> Consume patch and test actions, record results, and return completed, failed, or budget_exhausted.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `agent_loop` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A coding agent alternates actions and observations. Here the planner is an explicit recorded list of tool calls, making the loop deterministic and easy to inspect. The tools perform real file edits and real test runs.

Count every action against a step budget. Stop immediately when tests pass, when a tool call is invalid, or when the budget is exhausted. A production model can later supply the same typed actions without changing tool execution.

```figure
pj-tiny-coding-agent-4
```

## Predict first

What happens if a recording requests a shell command instead of an allowed tool?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `agent_loop` in `main.py` in your learner workspace. Consume patch and test actions, record results, and return completed, failed, or budget_exhausted. Never execute arbitrary command actions.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py tiny-coding-agent --init my-tiny-coding-agent
python3 scripts/project_test.py tiny-coding-agent --stage 4 --path my-tiny-coding-agent
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The demo first runs a failing test, patches addition, reruns the test, and ends completed.

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
