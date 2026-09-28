# MCP Server With 250 Tools

Build a paginated tool catalog, bounded discovery and a real JSON-RPC stdio server, then call it from a typed client.

Python and TypeScript standard libraries. Five cumulative stages and 25 deterministic tests. Node 22.18+ is required.

```figure
pj-mcp-at-scale-1
```

## Start

```bash
python3 scripts/project_test.py mcp-at-scale --init my-mcp-at-scale
python3 scripts/project_test.py mcp-at-scale --stage 1 --path my-mcp-at-scale
```

1. **Build a catalog of 250 read-only tools**: The generated catalog contains exactly 250 unique tools.
2. **Select tools under an explicit context budget**: The query pods count selects pods_count first and never exceeds the serialized budget.
3. **Implement initialized JSON-RPC over stdio**: A call before initialization returns -32002; an initialized tools/list returns 32 tools and a cursor.
4. **Audit catalog coverage through protocol pages**: An exhaustive traversal returns 250 unique names across 8 pages.

## Reference demo

```bash
python3 projects/mcp-at-scale/solution/demo.py
python3 scripts/project_test.py mcp-at-scale --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.
