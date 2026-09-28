# Record allowed handoff state transitions

> A received ticket becomes routed before it can become answered or escalated.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `handoff.py`: `begin`, `transition`. This artifact is stage 3 of Support Agent With Google ADK. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-support-agent-with-google-adk-3
```

## Follow the mechanism

A handoff is a state change with an owner and an audit event. Reject responses before routing and responses on a human-only route. Return a new session value rather than mutating the previous state, so a failed transition cannot partially rewrite the audit history.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def begin(ticket):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py support-agent-with-google-adk --init my-support-agent-with-google-adk
python3 scripts/project_test.py support-agent-with-google-adk --stage 3 --path my-support-agent-with-google-adk
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A received ticket becomes routed before it can become answered or escalated. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/support-agent-with-google-adk/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://google.github.io/adk-docs/agents/multi-agents/)
