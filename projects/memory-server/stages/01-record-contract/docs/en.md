# Keep text, namespace and provenance together

> Every memory needs a bounded id, namespace, text and source locator. Never return a detached string without its provenance. The small feature-hashing embedding maps normalized terms into a fixed vector; it is a deterministic lexical projection, not a pretrained semantic model. Hash collisions are expected and explain why lexical evidence remains part of retrieval.

**Type:** Build
**Languages:** TypeScript, Rust
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Every memory needs a bounded id, namespace, text and source locator. Never return a detached string without its provenance. The small feature-hashing embedding maps normalized terms into a fixed vector; it is a deterministic lexical projection, not a pretrained semantic model. Hash collisions are expected and explain why lexical evidence remains part of retrieval.

The boundary for this stage is `validateMemory, embed`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

TypeScript provides typed memory records; runtime validation protects JSON inputs. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-memory-server-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `validateMemory, embed` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The vector has 32 buckets, while each record retains a readable source locator.

## Verify

```bash
python3 scripts/project_test.py memory-server --init learning-artifacts/memory-server
python3 scripts/project_test.py memory-server --stage 1 --path learning-artifacts/memory-server
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py memory-server --path learning-artifacts/memory-server
node learning-artifacts/memory-server/main.ts --demo
```

## What you see

The vector has 32 buckets, while each record retains a readable source locator.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/memory-server/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
