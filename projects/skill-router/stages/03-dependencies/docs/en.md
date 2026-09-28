# Resolve dependencies before execution

> Use depth-first traversal with separate active and visited sets. Active membership catches a cycle; visited membership avoids duplicate execution through a diamond. Validate permission requirements on dependencies as well as the selected skill. Emit dependencies before their consumers and reject unknown dependency ids instead of silently skipping work.

**Type:** Build
**Languages:** TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Use depth-first traversal with separate active and visited sets. Active membership catches a cycle; visited membership avoids duplicate execution through a diamond. Validate permission requirements on dependencies as well as the selected skill. Emit dependencies before their consumers and reject unknown dependency ids instead of silently skipping work.

The boundary for this stage is `plan`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

A directed graph maps naturally onto typed arrays and sets. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-skill-router-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `plan` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

A review request produces tests then review; a hidden write permission in a prerequisite blocks the whole plan.

## Verify

```bash
python3 scripts/project_test.py skill-router --init learning-artifacts/skill-router
python3 scripts/project_test.py skill-router --stage 3 --path learning-artifacts/skill-router
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py skill-router --path learning-artifacts/skill-router
node learning-artifacts/skill-router/main.ts --demo
```

## What you see

A review request produces tests then review; a hidden write permission in a prerequisite blocks the whole plan.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/skill-router/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
