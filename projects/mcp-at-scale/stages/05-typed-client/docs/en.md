# Exercise the real wire with a typed client

> A function call can pass while the process protocol is broken.

**Type:** Build
**Languages:** TypeScript
**Stage:** 5 of 5
**Time:** ~2 hours

## What you build

`client.ts` starts the Python server, sends JSON lines, closes stdin, and validates every response before resolving. Use Node 22.18 or newer to run erasable TypeScript directly.

```figure
pj-mcp-at-scale-5
```

## Follow the mechanism

The parent and child have separate memory. Serialize requests, preserve their ids, and correlate replies after parsing. Initialization notifications intentionally have no id and receive no response. A client that expects one line per input line will hang.

Bound both elapsed time and accumulated output. A server can stall or print forever, so a response timeout alone is insufficient. Check the exit code and keep stderr separate from JSON output. Reject duplicate outgoing ids before creating the process.

## Build it

Export typed request and response interfaces, `initialize`, and `exchange(server, requests, timeout)`. Spawn with an argument array rather than a shell. The parent owns process cleanup on timeout, parse failure and excessive output.

## Run it

```bash
python3 scripts/project_test.py mcp-at-scale --stage 5 --path my-mcp-at-scale
node projects/mcp-at-scale/solution/client.ts
```

## What you should see

The real server returns `2` for `pods_count` over its two-pod fixture inventory. Five Node tests exercise response ids, notifications, an unknown method, all 250 tools across eight pages, and duplicate request rejection. No cluster or model credentials are required.

## Inspect the boundary

Explain why a successful Python handler test cannot establish newline framing, stdout purity or process exit behavior. Add a server that hangs and verify that your client kills it after the deadline.

## Primary reference

[MCP stdio transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)
