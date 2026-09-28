# Separate work time from waiting time

> Inclusive duration is end minus start. Exclusive duration subtracts the union of immediate child intervals, not their sum, because parallel children overlap. Root interval union provides wall time across runs. Tokens are local per span and summed once. The slowest result names the span with greatest exclusive duration, avoiding a root that is mostly waiting on children.

**Type:** Build
**Languages:** TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Inclusive duration is end minus start. Exclusive duration subtracts the union of immediate child intervals, not their sum, because parallel children overlap. Root interval union provides wall time across runs. Tokens are local per span and summed once. The slowest result names the span with greatest exclusive duration, avoiding a root that is mostly waiting on children.

The boundary for this stage is `unionDuration, analyze`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Interval arithmetic exposes concurrency without relying on a tracing library. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-agent-trace-debugger-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `unionDuration, analyze` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Overlapping child spans count once, and the model call becomes the largest owner of elapsed work.

## Verify

```bash
python3 scripts/project_test.py agent-trace-debugger --init learning-artifacts/agent-trace-debugger
python3 scripts/project_test.py agent-trace-debugger --stage 3 --path learning-artifacts/agent-trace-debugger
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py agent-trace-debugger --path learning-artifacts/agent-trace-debugger
node learning-artifacts/agent-trace-debugger/main.ts --demo
```

## What you see

Overlapping child spans count once, and the model call becomes the largest owner of elapsed work.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/agent-trace-debugger/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
