# Turn DOM state into constrained actions

> Read labels, values, disabled states and stable ids from a small form. Validate unique ids and field types. Choose one action at a time: fill the name, fill email, then click the uniquely identified Save request button. Page prose is never interpreted as instructions. Missing fields, ambiguous labels, dangerous buttons and unexpected origins cause an explicit blocked result.

**Type:** Build
**Languages:** TypeScript, Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Read labels, values, disabled states and stable ids from a small form. Validate unique ids and field types. Choose one action at a time: fill the name, fill email, then click the uniquely identified Save request button. Page prose is never interpreted as instructions. Missing fields, ambiguous labels, dangerous buttons and unexpected origins cause an explicit blocked result.

The boundary for this stage is `parseObservation, choose`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

TypeScript expresses observations and an action union with no arbitrary-script action. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-browser-agent-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `parseObservation, choose` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The action union contains fill and click only; injected page prose has no execution path.

## Verify

```bash
python3 scripts/project_test.py browser-agent --init learning-artifacts/browser-agent
python3 scripts/project_test.py browser-agent --stage 1 --path learning-artifacts/browser-agent
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py browser-agent --path learning-artifacts/browser-agent
node learning-artifacts/browser-agent/main.ts --demo
```

## What you see

The action union contains fill and click only; injected page prose has no execution path.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/browser-agent/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
