import test from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
const m = await import(
  pathToFileURL(path.join(process.env.PROJECT_WORKSPACE!, "main.ts")).href
);

async function serve(fn: any) {
  const d = await fs.mkdtemp(path.join(os.tmpdir(), "memory-http-"));
  const store = new m.MemoryStore(path.join(d, "log"));
  const server = m.createMemoryServer(store, "test-token");
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  try {
    await fn(`http://127.0.0.1:${server.address().port}`, store);
  } finally {
    await new Promise<void>((r) => server.close(() => r()));
    await fs.rm(d, { recursive: true, force: true });
  }
}
const headers = { authorization: "Bearer test-token" };
test("missing auth denied", async () =>
  serve(async (url: string) =>
    assert.equal((await fetch(url + "/health")).status, 401),
  ));
test("health on wire", async () =>
  serve(async (url: string) =>
    assert.deepEqual(await (await fetch(url + "/health", { headers })).json(), {
      ok: true,
    }),
  ));
test("REST writes revision", async () =>
  serve(async (url: string) => {
    const r = await fetch(url + "/memories", {
      method: "POST",
      headers,
      body: JSON.stringify({
        memory: { id: "m", namespace: "n", text: "text", source: "s:1" },
      }),
    });
    assert.equal(r.status, 201);
    assert.equal((await r.json()).revision, 1);
  }));
test("MCP lists tools", async () =>
  serve(async (url: string) => {
    const r = await fetch(url + "/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 7, method: "tools/list" }),
    });
    const data = await r.json();
    assert.equal(data.id, 7);
    assert.equal(data.result.tools.length, 2);
  }));
test("MCP tool error explicit", async () =>
  serve(async (url: string) => {
    const r = await fetch(url + "/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: "unknown" },
      }),
    });
    assert.equal((await r.json()).result.isError, true);
  }));
test("unknown method protocol error", async () =>
  serve(async (url: string) => {
    const r = await fetch(url + "/mcp", {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "missing" }),
    });
    assert.equal((await r.json()).error.code, -32601);
  }));
