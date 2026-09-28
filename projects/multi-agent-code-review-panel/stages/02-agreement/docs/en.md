# Aggregate independent support

> Group valid findings by file, line and rule. Count one vote per reviewer per group, reject duplicate reviewer identities, and retain every severity vote. A quorum produces consensus; a singleton remains visible as needs-review. A disagreement flag survives consensus so the user can inspect conflicting severity judgments.

**Type:** Build
**Languages:** TypeScript
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Group valid findings by file, line and rule. Count one vote per reviewer per group, reject duplicate reviewer identities, and retain every severity vote. A quorum produces consensus; a singleton remains visible as needs-review. A disagreement flag survives consensus so the user can inspect conflicting severity judgments.

The boundary for this stage is `aggregate`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Sets make reviewer identity and per-review deduplication explicit. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-multi-agent-code-review-panel-2
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `aggregate` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

One reviewer repeating a finding stays at one vote; two reviewers with different severity values show consensus and disagreement.

## Verify

```bash
python3 scripts/project_test.py multi-agent-code-review-panel --init learning-artifacts/multi-agent-code-review-panel
python3 scripts/project_test.py multi-agent-code-review-panel --stage 2 --path learning-artifacts/multi-agent-code-review-panel
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py multi-agent-code-review-panel --path learning-artifacts/multi-agent-code-review-panel
node learning-artifacts/multi-agent-code-review-panel/main.ts --demo
```

## What you see

One reviewer repeating a finding stays at one vote; two reviewers with different severity values show consensus and disagreement.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/multi-agent-code-review-panel/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
