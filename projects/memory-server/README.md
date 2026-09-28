# Persistent Memory Server

Build a versioned memory log with serialized writes, combine lexical and Rust vector scores, and serve the same operations over local REST and MCP.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py memory-server --init learning-artifacts/memory-server
python3 scripts/project_test.py memory-server --path learning-artifacts/memory-server
cd projects/memory-server/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Keep text, namespace and provenance together](stages/01-record-contract/docs/en.md)
2. [Serialize revisioned writes](stages/02-durable-log/docs/en.md)
3. [Score vectors in a real Rust process](stages/03-hybrid-search/docs/en.md)
4. [Expose REST and MCP tools](stages/04-transports/docs/en.md)

## Primary sources

- [MCP tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Rust standard library](https://doc.rust-lang.org/std/)
- [Node HTTP API](https://nodejs.org/api/http.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
