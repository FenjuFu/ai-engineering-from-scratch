# Persist rules across sessions

> Write a versioned JSON snapshot to a unique sibling temporary file with owner-only permissions, then rename it into place. Readers see the old or new complete file. Missing storage means an empty collection, while malformed storage is an error. This snapshot store supports one writer process; cross-process merge and locking are a separate extension.

**Type:** Build
**Languages:** TypeScript
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Write a versioned JSON snapshot to a unique sibling temporary file with owner-only permissions, then rename it into place. Readers see the old or new complete file. Missing storage means an empty collection, while malformed storage is an error. This snapshot store supports one writer process; cross-process merge and locking are a separate extension.

The boundary for this stage is `save, load`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Node filesystem APIs support atomic replacement without another dependency. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-workflow-hooks-4
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `save, load` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The demo writes rules.json, reloads it, and emits a scoped hook payload with two source ids.

## Verify

```bash
python3 scripts/project_test.py workflow-hooks --init learning-artifacts/workflow-hooks
python3 scripts/project_test.py workflow-hooks --stage 4 --path learning-artifacts/workflow-hooks
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py workflow-hooks --path learning-artifacts/workflow-hooks
node learning-artifacts/workflow-hooks/main.ts --demo
```

## What you see

The demo writes rules.json, reloads it, and emits a scoped hook payload with two source ids.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/workflow-hooks/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
