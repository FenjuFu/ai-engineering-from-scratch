# Parse the untrusted boundary

> A model response is a byte string. Parse the entire string as JSON, reject markdown wrappers and trailing text, and cap its UTF-8 byte size before parsing. Accept JSON primitives as well as objects: the schema, not the parser, determines whether a primitive is useful. Do not remove text until it happens to parse because that hides the actual output contract.

**Type:** Build
**Languages:** TypeScript
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

A model response is a byte string. Parse the entire string as JSON, reject markdown wrappers and trailing text, and cap its UTF-8 byte size before parsing. Accept JSON primitives as well as objects: the schema, not the parser, determines whether a primitive is useful. Do not remove text until it happens to parse because that hides the actual output contract.

The boundary for this stage is `parseJSON`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

TypeScript keeps unknown data separate from typed application values. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-json-schema-output-guard-1
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `parseJSON` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

The parser returns a value for valid JSON and throws for trailing instructions or an oversized response.

## Verify

```bash
python3 scripts/project_test.py json-schema-output-guard --init learning-artifacts/json-schema-output-guard
python3 scripts/project_test.py json-schema-output-guard --stage 1 --path learning-artifacts/json-schema-output-guard
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py json-schema-output-guard --path learning-artifacts/json-schema-output-guard
node learning-artifacts/json-schema-output-guard/main.ts --demo
```

## What you see

The parser returns a value for valid JSON and throws for trailing instructions or an oversized response.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/json-schema-output-guard/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
