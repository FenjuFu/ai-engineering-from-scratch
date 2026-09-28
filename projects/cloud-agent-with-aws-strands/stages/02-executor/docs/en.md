# Execute reads within step and response budgets

> A zero-step budget performs no provider calls and returns budget_exhausted.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Implement `executor.py`: `execute`. This artifact is stage 2 of Cloud Agent With AWS Strands. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-cloud-agent-with-aws-strands-2
```

## Follow the mechanism

Charge steps before starting an operation and charge serialized output before retaining it. Output limits cannot undo the cost of a call, but they prevent a large result from flooding later context. Keep partial results and an explicit terminal state so a budget stop remains diagnosable.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def execute(plan,provider,max_steps=5,max_chars=4000):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py cloud-agent-with-aws-strands --init my-cloud-agent-with-aws-strands
python3 scripts/project_test.py cloud-agent-with-aws-strands --stage 2 --path my-cloud-agent-with-aws-strands
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A zero-step budget performs no provider calls and returns budget_exhausted. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/cloud-agent-with-aws-strands/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://strandsagents.com/docs/user-guide/concepts/model-providers/custom_model_provider/)
