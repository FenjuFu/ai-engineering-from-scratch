import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { classify, makePlan, executePlan, type Tool } from "../main.ts";
const ticketSchema = z.object({
  id: z.string().min(1),
  message: z.string().min(1),
});
const classificationSchema = z.object({
  ticket: ticketSchema,
  intent: z.enum(["read", "write"]),
  topic: z.string(),
});
const planSchema = z.object({
  ticket: ticketSchema,
  actions: z.array(
    z.object({ tool: z.enum(["lookup", "update"]), query: z.string() }),
  ),
  requiresApproval: z.boolean(),
});
const resultSchema = z.object({
  ticketId: z.string(),
  answer: z.string(),
  calls: z.number(),
});
export function createTicketWorkflow(tool: Tool, approved = false) {
  const classifyStep = createStep({
    id: "classify",
    inputSchema: ticketSchema,
    outputSchema: classificationSchema,
    execute: async ({ inputData }) => classify(inputData),
  });
  const planStep = createStep({
    id: "plan",
    inputSchema: classificationSchema,
    outputSchema: planSchema,
    execute: async ({ inputData }) => makePlan(inputData),
  });
  const executeStep = createStep({
    id: "execute",
    inputSchema: planSchema,
    outputSchema: resultSchema,
    execute: async ({ inputData }) => {
      const result = await executePlan(inputData, tool, {
        approved,
        maxCalls: 3,
        maxAttempts: 2,
      });
      if (result.status !== "complete") throw new Error(result.status);
      return result.result;
    },
  });
  return createWorkflow({
    id: "ticket-triage",
    inputSchema: ticketSchema,
    outputSchema: resultSchema,
  })
    .then(classifyStep)
    .then(planStep)
    .then(executeStep)
    .commit();
}
