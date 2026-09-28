# Implement initialized JSON-RPC over stdio

> A call before initialization returns -32002; an initialized tools/list returns 32 tools and a cursor.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `protocol.py`: `handle`, `serve`. This artifact is stage 3 of MCP Server With 250 Tools. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-mcp-at-scale-3
```

## Follow the mechanism

The protocol has a lifecycle: negotiate a version, receive the initialized notification, then list or call tools. Notifications have no response. Separate transport errors from tool execution errors, preserve the request id, and paginate the catalog instead of returning all 250 schemas at once.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def handle(request,state,inventory):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py mcp-at-scale --init my-mcp-at-scale
python3 scripts/project_test.py mcp-at-scale --stage 3 --path my-mcp-at-scale
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A call before initialization returns -32002; an initialized tools/list returns 32 tools and a cursor. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/mcp-at-scale/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Reference 2](https://www.jsonrpc.org/specification)
