# Retry transient reads and reuse completed requests

> A transient timeout retries, while a permission failure is propagated after one call.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `retry.py`: `request_key`, `cached_read`. This artifact is stage 3 of Cloud Agent With AWS Strands. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-cloud-agent-with-aws-strands-3
```

## Follow the mechanism

Retry only transient timeout failures and cache successful reads by a canonical action identity. A permission failure is not transient and must escape immediately. This cache is request-local: real cloud state changes, so a long-lived cache needs an explicit TTL or version instead of silently reusing old data.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def request_key(operation, resource):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py cloud-agent-with-aws-strands --init my-cloud-agent-with-aws-strands
python3 scripts/project_test.py cloud-agent-with-aws-strands --stage 3 --path my-cloud-agent-with-aws-strands
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A transient timeout retries, while a permission failure is propagated after one call. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/cloud-agent-with-aws-strands/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://strandsagents.com/docs/user-guide/concepts/model-providers/custom_model_provider/)
