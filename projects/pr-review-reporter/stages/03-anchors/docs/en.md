# Verify and merge findings

> Require an existing added-line location and a nonempty exact source substring for every candidate. Reject fabricated files, deleted-line locations, empty quotes and invalid severity values. Merge findings by file, line and rule; keep the stronger severity when reviewers disagree. The quote gate establishes location support, not the truth of a security claim, which still needs review.

**Type:** Build
**Languages:** Python, TypeScript
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Require an existing added-line location and a nonempty exact source substring for every candidate. Reject fabricated files, deleted-line locations, empty quotes and invalid severity values. Merge findings by file, line and rule; keep the stronger severity when reviewers disagree. The quote gate establishes location support, not the truth of a security claim, which still needs review.

The boundary for this stage is `verify, merge`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

A typed verification result keeps rejected model suggestions out of the renderer. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-pr-review-reporter-3
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `verify, merge` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Unsupported candidates stay in a rejected collection; duplicate supported candidates collapse into one finding.

## Verify

```bash
python3 scripts/project_test.py pr-review-reporter --init learning-artifacts/pr-review-reporter
python3 scripts/project_test.py pr-review-reporter --stage 3 --path learning-artifacts/pr-review-reporter
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py pr-review-reporter --path learning-artifacts/pr-review-reporter
node learning-artifacts/pr-review-reporter/main.ts --demo
```

## What you see

Unsupported candidates stay in a rejected collection; duplicate supported candidates collapse into one finding.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/pr-review-reporter/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
