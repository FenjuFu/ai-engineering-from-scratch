# Validate tool plans and approval requirements

> Construct a plan with lookup for read intent and update for write intent. Revalidate plans at execution because checkpoints are serialized data. Require the approval flag to equal the presence of an update action. An attacker cannot turn a saved write checkpoint into an automatically executable read by changing one boolean.

**Type:** Build
**Languages:** TypeScript
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Construct a plan with lookup for read intent and update for write intent. Revalidate plans at execution because checkpoints are serialized data. Require the approval flag to equal the presence of an update action. An attacker cannot turn a saved write checkpoint into an automatically executable read by changing one boolean.

The boundary for this stage is `makePlan, validatePlan`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

A typed Plan exposes both action shape and the approval bit that must match it. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-typed-workflow-agent-with-mastra-2
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `makePlan, validatePlan` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

A checkpoint containing update cannot pass validation with requiresApproval set to false.

## Verify

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --init learning-artifacts/typed-workflow-agent-with-mastra
python3 scripts/project_test.py typed-workflow-agent-with-mastra --stage 2 --path learning-artifacts/typed-workflow-agent-with-mastra
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra
node learning-artifacts/typed-workflow-agent-with-mastra/main.ts --demo
```

## What you see

A checkpoint containing update cannot pass validation with requiresApproval set to false.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/typed-workflow-agent-with-mastra/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
