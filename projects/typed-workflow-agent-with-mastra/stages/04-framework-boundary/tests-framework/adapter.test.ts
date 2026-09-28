import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const workspace = process.env.PROJECT_WORKSPACE;
assert.ok(
  workspace,
  "PROJECT_WORKSPACE must identify the learner implementation",
);
const { createTicketWorkflow } = await import(
  pathToFileURL(path.join(workspace, "optional-mastra/adapter.ts")).href
);
const { runTicket } = await import(
  pathToFileURL(path.join(workspace, "main.ts")).href
);
const ticket = { id: "T-1", message: "Find billing policy" };
const fake = async () => "Refunds require a receipt.";

test("real Mastra run returns the same business result as the scratch runtime", async () => {
  const run = await createTicketWorkflow(fake).createRun();
  const actual = await run.start({ inputData: ticket });
  const expected = {
    ticketId: "T-1",
    answer: "Refunds require a receipt.",
    calls: 1,
  };
  assert.equal(actual.status, "success");
  assert.deepEqual(actual.result, expected);
  assert.deepEqual((await runTicket(ticket, fake)).result, expected);
});

test("invalid input fails the workflow before invoking a tool", async () => {
  let calls = 0;
  const run = await createTicketWorkflow(async () => {
    calls++;
    return "unexpected";
  }).createRun();
  const status = await run.start({ inputData: { id: "", message: "" } }).then(
    (result: { status: string }) => result.status,
    () => "rejected",
  );
  assert.notEqual(status, "success");
  assert.equal(calls, 0);
});

test("a write without approval fails without side effects", async () => {
  let calls = 0;
  const run = await createTicketWorkflow(async () => {
    calls++;
    return "unexpected";
  }).createRun();
  const result = await run.start({
    inputData: { id: "T-2", message: "update billing address" },
  });
  assert.equal(result.status, "failed");
  assert.equal(calls, 0);
});

test("an approved write invokes the selected tool with its original query", async () => {
  const calls: { name: string; query: string }[] = [];
  const run = await createTicketWorkflow(
    async (name: string, query: string) => {
      calls.push({ name, query });
      return "updated";
    },
    true,
  ).createRun();
  const result = await run.start({
    inputData: { id: "T-3", message: "update billing address" },
  });
  assert.equal(result.status, "success");
  assert.deepEqual(calls, [
    { name: "update", query: "update billing address" },
  ]);
  assert.deepEqual(result.result, {
    ticketId: "T-3",
    answer: "updated",
    calls: 1,
  });
});

test("empty tool output exhausts two attempts and fails the workflow", async () => {
  let calls = 0;
  const run = await createTicketWorkflow(async () => {
    calls++;
    return "";
  }).createRun();
  assert.equal((await run.start({ inputData: ticket })).status, "failed");
  assert.equal(calls, 2);
});
