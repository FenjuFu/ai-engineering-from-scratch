# Measure panel precision and recall

> Evaluate unique finding ids against an expected set. Precision measures how many predicted findings are expected; recall measures how much of the expected set was found. Deduplicate both sets so repeated reviewers cannot inflate the metric. Zero predictions produce precision zero rather than a misleading perfect score. Try held-out inputs before adjusting quorum.

**Type:** Build
**Languages:** TypeScript
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Evaluate unique finding ids against an expected set. Precision measures how many predicted findings are expected; recall measures how much of the expected set was found. Deduplicate both sets so repeated reviewers cannot inflate the metric. Zero predictions produce precision zero rather than a misleading perfect score. Try held-out inputs before adjusting quorum.

The boundary for this stage is `evaluate`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Small pure metrics let deterministic fixtures establish a baseline before model integrations. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-multi-agent-code-review-panel-4
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `evaluate` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

False positives reduce precision while missed expected findings reduce recall; quorum is a tradeoff to measure.

## Verify

```bash
python3 scripts/project_test.py multi-agent-code-review-panel --init learning-artifacts/multi-agent-code-review-panel
python3 scripts/project_test.py multi-agent-code-review-panel --stage 4 --path learning-artifacts/multi-agent-code-review-panel
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py multi-agent-code-review-panel --path learning-artifacts/multi-agent-code-review-panel
node learning-artifacts/multi-agent-code-review-panel/main.ts --demo
```

## What you see

False positives reduce precision while missed expected findings reduce recall; quorum is a tradeoff to measure.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/multi-agent-code-review-panel/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
