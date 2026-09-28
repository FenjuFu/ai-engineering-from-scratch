# Build a catalog of 250 read-only tools

> The generated catalog contains exactly 250 unique tools.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Implement `registry.py`: `catalog`, `execute`. This artifact is stage 1 of MCP Server With 250 Tools. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-mcp-at-scale-1
```

## Follow the mechanism

Create five narrowly scoped read operations for each of 50 resource kinds. The names and schemas are stable; execution reads an injected inventory rather than contacting a cluster. A tool schema defines the exact accepted keys and values, so an unknown argument never reaches a handler by accident.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def catalog():
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py mcp-at-scale --init my-mcp-at-scale
python3 scripts/project_test.py mcp-at-scale --stage 1 --path my-mcp-at-scale
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The generated catalog contains exactly 250 unique tools. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/mcp-at-scale/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Reference 2](https://www.jsonrpc.org/specification)
