# Install atomically within a root

> Check the expected digest before creating directories. Inspect each agent directory with lstat and reject symlinks. Stage the complete translated bundle beside the destination, then rename it. An existing managed installation moves to a temporary backup so a failed final rename can restore it. This educational transaction assumes a single trusted local writer; hostile concurrent filesystem replacement requires OS-level isolation.

**Type:** Build
**Languages:** TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Check the expected digest before creating directories. Inspect each agent directory with lstat and reject symlinks. Stage the complete translated bundle beside the destination, then rename it. An existing managed installation moves to a temporary backup so a failed final rename can restore it. This educational transaction assumes a single trusted local writer; hostile concurrent filesystem replacement requires OS-level isolation.

The boundary for this stage is `install`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Node provides lstat, exclusive writes and directory rename for a bounded local transaction. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-skill-installer-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `install` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

A valid bundle appears completely under its agent directory; a wrong digest leaves an empty root.

## Verify

```bash
python3 scripts/project_test.py skill-installer --init learning-artifacts/skill-installer
python3 scripts/project_test.py skill-installer --stage 3 --path learning-artifacts/skill-installer
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py skill-installer --path learning-artifacts/skill-installer
node learning-artifacts/skill-installer/main.ts --demo
```

## What you see

A valid bundle appears completely under its agent directory; a wrong digest leaves an empty root.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/skill-installer/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
