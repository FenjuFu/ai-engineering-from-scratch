# Capture corrections with provenance

> Require a correction id, session id, scope, rule and source excerpt. Normalize rule whitespace and case for comparison while preserving source evidence. Reject oversized values and obvious credential-shaped content. This heuristic is not a complete secret scanner: callers must redact source data before ingestion.

**Type:** Build
**Languages:** TypeScript
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Require a correction id, session id, scope, rule and source excerpt. Normalize rule whitespace and case for comparison while preserving source evidence. Reject oversized values and obvious credential-shaped content. This heuristic is not a complete secret scanner: callers must redact source data before ingestion.

The boundary for this stage is `normalize, ingest`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

TypeScript expresses the boundary between raw hook input and a validated correction. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-workflow-hooks-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `normalize, ingest` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

A validated correction has a stable comparison form and an intact source locator.

## Verify

```bash
python3 scripts/project_test.py workflow-hooks --init learning-artifacts/workflow-hooks
python3 scripts/project_test.py workflow-hooks --stage 1 --path learning-artifacts/workflow-hooks
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py workflow-hooks --path learning-artifacts/workflow-hooks
node learning-artifacts/workflow-hooks/main.ts --demo
```

## What you see

A validated correction has a stable comparison form and an intact source locator.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/workflow-hooks/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
