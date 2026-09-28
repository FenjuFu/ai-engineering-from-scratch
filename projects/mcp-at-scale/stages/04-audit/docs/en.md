# Audit catalog coverage through protocol pages

> An exhaustive traversal returns 250 unique names across 8 pages.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Implement `audit.py`: `audit_catalog`. This artifact is stage 4 of MCP Server With 250 Tools. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-mcp-at-scale-4
```

## Follow the mechanism

Treat pagination as a client-visible contract. Traverse every page through the handler and track duplicate names across page boundaries. A finite page guard catches accidental cursor loops. This audit validates the protocol inventory, while the final typed client will exercise the separate operating-system process boundary.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def audit_catalog(inventory=None):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py mcp-at-scale --init my-mcp-at-scale
python3 scripts/project_test.py mcp-at-scale --stage 4 --path my-mcp-at-scale
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

An exhaustive traversal returns 250 unique names across 8 pages. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/mcp-at-scale/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Reference 2](https://www.jsonrpc.org/specification)
