# Count independent sessions

> Group by scope and normalized rule text. Deduplicate event ids and reject a reused id with different content. Count unique sessions rather than event count, so repeated hook delivery cannot promote a rule. Keep every source id attached to the candidate and sort the final output for reproducible files.

**Type:** Build
**Languages:** TypeScript
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Group by scope and normalized rule text. Deduplicate event ids and reject a reused id with different content. Count unique sessions rather than event count, so repeated hook delivery cannot promote a rule. Keep every source id attached to the candidate and sort the final output for reproducible files.

The boundary for this stage is `consolidate`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Maps and sets let you separate repeated events from independent supporting evidence. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-workflow-hooks-2
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `consolidate` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Two events in one session produce one supporting session; two sessions remain a candidate until approval.

## Verify

```bash
python3 scripts/project_test.py workflow-hooks --init learning-artifacts/workflow-hooks
python3 scripts/project_test.py workflow-hooks --stage 2 --path learning-artifacts/workflow-hooks
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py workflow-hooks --path learning-artifacts/workflow-hooks
node learning-artifacts/workflow-hooks/main.ts --demo
```

## What you see

Two events in one session produce one supporting session; two sessions remain a candidate until approval.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/workflow-hooks/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
