# Repair with a finite budget

> Feed only structured validation feedback into a generation callback. Count each call before interpreting its output. Stop immediately after acceptance and return an explicit exhausted state after the final rejected attempt. Provider failures propagate instead of being disguised as schema failures. The trace records each attempt so a successful third response does not conceal two earlier contract violations.

**Type:** Build
**Languages:** TypeScript
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Feed only structured validation feedback into a generation callback. Count each call before interpreting its output. Stop immediately after acceptance and return an explicit exhausted state after the final rejected attempt. Provider failures propagate instead of being disguised as schema failures. The trace records each attempt so a successful third response does not conceal two earlier contract violations.

The boundary for this stage is `repair`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Async function types allow deterministic fake generation and a later provider adapter. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-json-schema-output-guard-4
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `repair` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The demo rejects confidence 1.5, passes an above-maximum issue to the next attempt, then accepts confidence 0.9.

## Verify

```bash
python3 scripts/project_test.py json-schema-output-guard --init learning-artifacts/json-schema-output-guard
python3 scripts/project_test.py json-schema-output-guard --stage 4 --path learning-artifacts/json-schema-output-guard
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py json-schema-output-guard --path learning-artifacts/json-schema-output-guard
node learning-artifacts/json-schema-output-guard/main.ts --demo
```

## What you see

The demo rejects confidence 1.5, passes an above-maximum issue to the next attempt, then accepts confidence 0.9.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/json-schema-output-guard/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
