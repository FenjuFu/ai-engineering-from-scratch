# Validate a scoped cloud inspection plan

> A delete operation or an out-of-scope resource fails before any provider call.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Implement `plan.py`: `validate_plan`. This artifact is stage 1 of Cloud Agent With AWS Strands. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-cloud-agent-with-aws-strands-1
```

## Follow the mechanism

The model proposes intent; a deterministic validator grants authority. Accept only explicitly named read operations and resource ids from the caller scope. Reject unknown keys and oversized plans so additional model-generated instructions cannot silently become executable parameters.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def validate_plan(raw,scope):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py cloud-agent-with-aws-strands --init my-cloud-agent-with-aws-strands
python3 scripts/project_test.py cloud-agent-with-aws-strands --stage 1 --path my-cloud-agent-with-aws-strands
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A delete operation or an out-of-scope resource fails before any provider call. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/cloud-agent-with-aws-strands/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://strandsagents.com/docs/user-guide/concepts/model-providers/custom_model_provider/)
