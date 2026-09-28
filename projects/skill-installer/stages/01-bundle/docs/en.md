# Validate a portable bundle

> Accept a named bundle with a SKILL.md and optional reference files. Validate every relative path before touching disk. Reject dot segments, absolute paths, drive prefixes, backslashes and reserved installation metadata. Limit each text file to 100 KB. The installer reads an in-memory bundle, leaving network fetching and signature trust as separate responsibilities.

**Type:** Build
**Languages:** TypeScript
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Accept a named bundle with a SKILL.md and optional reference files. Validate every relative path before touching disk. Reject dot segments, absolute paths, drive prefixes, backslashes and reserved installation metadata. Limit each text file to 100 KB. The installer reads an in-memory bundle, leaving network fetching and signature trust as separate responsibilities.

The boundary for this stage is `safePath, validate`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

TypeScript gives the bundle and agent destinations explicit contracts. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-skill-installer-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `safePath, validate` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Portable reference paths pass; every escape path is rejected before filesystem mutation.

## Verify

```bash
python3 scripts/project_test.py skill-installer --init learning-artifacts/skill-installer
python3 scripts/project_test.py skill-installer --stage 1 --path learning-artifacts/skill-installer
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py skill-installer --path learning-artifacts/skill-installer
node learning-artifacts/skill-installer/main.ts --demo
```

## What you see

Portable reference paths pass; every escape path is rejected before filesystem mutation.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/skill-installer/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
