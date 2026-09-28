# Select tools under an explicit context budget

> The query pods count selects pods_count first and never exceeds the serialized budget.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Implement `discovery.py`: `discover`. This artifact is stage 2 of MCP Server With 250 Tools. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-mcp-at-scale-2
```

## Follow the mechanism

Rank metadata before sending tools into a context window. Count the actual compact JSON characters of each selected schema and stop at the explicit budget. This is a character budget, not a model-token estimate; keep the units honest. Stable name ties make discovery reproducible.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def discover(tools,query,max_chars=1500,k=5):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py mcp-at-scale --init my-mcp-at-scale
python3 scripts/project_test.py mcp-at-scale --stage 2 --path my-mcp-at-scale
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The query pods count selects pods_count first and never exceeds the serialized budget. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/mcp-at-scale/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Reference 2](https://www.jsonrpc.org/specification)
