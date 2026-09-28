# Validate parent relationships

> A child span must reference an existing parent and fit inside the parent interval. Check every ancestor chain for cycles and reject duplicate ids. Multiple roots are allowed because a trace can contain overlapping independent runs. Validation happens before aggregation so corrupted graphs cannot produce convincing charts.

**Type:** Build
**Languages:** TypeScript
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

A child span must reference an existing parent and fit inside the parent interval. Check every ancestor chain for cycles and reject duplicate ids. Multiple roots are allowed because a trace can contain overlapping independent runs. Validation happens before aggregation so corrupted graphs cannot produce convincing charts.

The boundary for this stage is `validateTree`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Maps provide stable identity lookup and sets expose cycles. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-agent-trace-debugger-2
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `validateTree` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The graph rejects a plausible-looking child that ends after its parent.

## Verify

```bash
python3 scripts/project_test.py agent-trace-debugger --init learning-artifacts/agent-trace-debugger
python3 scripts/project_test.py agent-trace-debugger --stage 2 --path learning-artifacts/agent-trace-debugger
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py agent-trace-debugger --path learning-artifacts/agent-trace-debugger
node learning-artifacts/agent-trace-debugger/main.ts --demo
```

## What you see

The graph rejects a plausible-looking child that ends after its parent.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/agent-trace-debugger/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
