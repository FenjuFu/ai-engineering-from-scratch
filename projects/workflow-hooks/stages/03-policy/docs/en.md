# Approve and select scoped rules

> Require independent-session support before an explicit approval transition. Retired rules cannot be silently resurrected. At hook time, include only approved rules matching the current scope or global scope. Return source ids with injected rule text so the user can trace where persistent guidance came from.

**Type:** Build
**Languages:** TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Require independent-session support before an explicit approval transition. Retired rules cannot be silently resurrected. At hook time, include only approved rules matching the current scope or global scope. Return source ids with injected rule text so the user can trace where persistent guidance came from.

The boundary for this stage is `transition, hook`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

A state union makes candidate, approved and retired behavior explicit. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-workflow-hooks-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `transition, hook` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Only an approved rule with matching scope appears in the hook payload; sources travel with it.

## Verify

```bash
python3 scripts/project_test.py workflow-hooks --init learning-artifacts/workflow-hooks
python3 scripts/project_test.py workflow-hooks --stage 3 --path learning-artifacts/workflow-hooks
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py workflow-hooks --path learning-artifacts/workflow-hooks
node learning-artifacts/workflow-hooks/main.ts --demo
```

## What you see

Only an approved rule with matching scope appears in the hook payload; sources travel with it.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/workflow-hooks/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
