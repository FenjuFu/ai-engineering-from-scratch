# Abstain on ambiguous or blocked requests

> Join ranking and dependency planning while preserving four distinct outcomes: ready, no-match, ambiguous and blocked. A score gap below the margin is ambiguous even if the tie-breaker produces a first result. A ranked winner can still be blocked by permissions. Return the ranked explanations in every outcome so a caller can display the decision.

**Type:** Build
**Languages:** TypeScript
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Join ranking and dependency planning while preserving four distinct outcomes: ready, no-match, ambiguous and blocked. A score gap below the margin is ambiguous even if the tie-breaker produces a first result. A ranked winner can still be blocked by permissions. Return the ranked explanations in every outcome so a caller can display the decision.

The boundary for this stage is `route`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Discriminated status values prevent an uncertain route from becoming an execution request. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-skill-router-4
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `route` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The CLI prints a ready decision, ranked evidence and the ordered two-skill execution plan.

## Verify

```bash
python3 scripts/project_test.py skill-router --init learning-artifacts/skill-router
python3 scripts/project_test.py skill-router --stage 4 --path learning-artifacts/skill-router
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py skill-router --path learning-artifacts/skill-router
node learning-artifacts/skill-router/main.ts --demo
```

## What you see

The CLI prints a ready decision, ranked evidence and the ordered two-skill execution plan.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/skill-router/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
