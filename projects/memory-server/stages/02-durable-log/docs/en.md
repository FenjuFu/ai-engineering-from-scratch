# Serialize revisioned writes

> Load a versioned event log and reconstruct the latest record for each namespace/id pair. An update must name its expected revision. Serialize writes so two callers racing from revision zero cannot both succeed. Append before mutating the in-memory map. This is a single-process store: append completion is not a power-loss durability guarantee, and multiple server processes require an external lock or database.

**Type:** Build
**Languages:** TypeScript, Rust
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Load a versioned event log and reconstruct the latest record for each namespace/id pair. An update must name its expected revision. Serialize writes so two callers racing from revision zero cannot both succeed. Append before mutating the in-memory map. This is a single-process store: append completion is not a power-loss durability guarantee, and multiple server processes require an external lock or database.

The boundary for this stage is `MemoryStore.put, MemoryStore.list`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Promises serialize local writes while JSONL makes the durable history inspectable. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-memory-server-2
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `MemoryStore.put, MemoryStore.list` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Two concurrent creates return one success and one revision conflict; reopening recovers the successful record.

## Verify

```bash
python3 scripts/project_test.py memory-server --init learning-artifacts/memory-server
python3 scripts/project_test.py memory-server --stage 2 --path learning-artifacts/memory-server
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py memory-server --path learning-artifacts/memory-server
node learning-artifacts/memory-server/main.ts --demo
```

## What you see

Two concurrent creates return one success and one revision conflict; reopening recovers the successful record.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/memory-server/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
