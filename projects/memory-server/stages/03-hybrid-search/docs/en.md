# Score vectors in a real Rust process

> Compile score.rs with the standard Rust toolchain and send query and document vectors over stdin. Compute cosine similarity, returning zero for a zero-norm vector. Combine 60 percent lexical query coverage with 40 percent cosine score and use ids to break ties. Test dimensions and finite values before crossing the process boundary. Compile the Rust binary into a private temporary directory and remove it on normal process exit. Never trust an executable already present at a predictable shared temporary path.

**Type:** Build
**Languages:** TypeScript, Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Compile score.rs with the standard Rust toolchain and send query and document vectors over stdin. Compute cosine similarity, returning zero for a zero-norm vector. Combine 60 percent lexical query coverage with 40 percent cosine score and use ids to break ties. Test dimensions and finite values before crossing the process boundary. Compile the Rust binary into a private temporary directory and remove it on normal process exit. Never trust an executable already present at a predictable shared temporary path.

The boundary for this stage is `cosineScores, MemoryStore.search`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Rust handles the numerical kernel through a narrow line protocol; TypeScript owns retrieval and provenance. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-memory-server-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `cosineScores, MemoryStore.search` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The Rust kernel scores identical vectors as 1.0 and search returns the matching memory with its source intact.

## Verify

```bash
python3 scripts/project_test.py memory-server --init learning-artifacts/memory-server
python3 scripts/project_test.py memory-server --stage 3 --path learning-artifacts/memory-server
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py memory-server --path learning-artifacts/memory-server
node learning-artifacts/memory-server/main.ts --demo
```

## What you see

The Rust kernel scores identical vectors as 1.0 and search returns the matching memory with its source intact.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/memory-server/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
