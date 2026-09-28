# Recover new-file line numbers

> Parse hunk headers into old and new counters. Context consumes both counters, deletions consume only the old counter, and additions consume the new counter while producing a reviewable location. Reject truncated hunks and parent-traversing paths. The parser is deliberately for text unified diffs; binary patches and combined merge diffs are outside the contract. Wire Python into TypeScript using execFileSync and stdin, never an interpolated shell command.

**Type:** Build
**Languages:** Python, TypeScript
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Parse hunk headers into old and new counters. Context consumes both counters, deletions consume only the old counter, and additions consume the new counter while producing a reviewable location. Reject truncated hunks and parent-traversing paths. The parser is deliberately for text unified diffs; binary patches and combined merge diffs are outside the contract. Wire Python into TypeScript using execFileSync and stdin, never an interpolated shell command.

The boundary for this stage is `parseDiff`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Python handles a streaming text grammar while TypeScript consumes a typed JSON boundary. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-pr-review-reporter-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `parseDiff` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

A replacement stays on the new file line even when the old side removes several lines.

## Verify

```bash
python3 scripts/project_test.py pr-review-reporter --init learning-artifacts/pr-review-reporter
python3 scripts/project_test.py pr-review-reporter --stage 1 --path learning-artifacts/pr-review-reporter
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py pr-review-reporter --path learning-artifacts/pr-review-reporter
node learning-artifacts/pr-review-reporter/main.ts --demo
```

## What you see

A replacement stays on the new file line even when the old side removes several lines.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/pr-review-reporter/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
