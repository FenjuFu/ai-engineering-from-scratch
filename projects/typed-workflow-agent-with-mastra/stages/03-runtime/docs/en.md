# Suspend, resume and bound retries

> Execute each action with a per-action attempt limit and a shared call budget. Count failed calls against the total. Suspend before any mutation when approval is absent, returning a copy of the plan as the checkpoint. Resume by passing the checkpoint with explicit approval. Empty tool output is a failure, not a successful answer. The in-memory runner has no crash recovery during an action; real side effects need idempotency keys.

**Type:** Build
**Languages:** TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Execute each action with a per-action attempt limit and a shared call budget. Count failed calls against the total. Suspend before any mutation when approval is absent, returning a copy of the plan as the checkpoint. Resume by passing the checkpoint with explicit approval. Empty tool output is a failure, not a successful answer. The in-memory runner has no crash recovery during an action; real side effects need idempotency keys.

The boundary for this stage is `executePlan, runTicket`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Async functions keep tool adapters injectable while result unions preserve terminal states. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-typed-workflow-agent-with-mastra-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `executePlan, runTicket` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The demo shows a completed lookup, a suspended update and a completed approved resumption.

## Verify

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --init learning-artifacts/typed-workflow-agent-with-mastra
python3 scripts/project_test.py typed-workflow-agent-with-mastra --stage 3 --path learning-artifacts/typed-workflow-agent-with-mastra
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra
node learning-artifacts/typed-workflow-agent-with-mastra/main.ts --demo
```

## What you see

The demo shows a completed lookup, a suspended update and a completed approved resumption.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/typed-workflow-agent-with-mastra/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
