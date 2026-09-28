import type { createWorkflow } from "@mastra/core/workflows";

type Tool = (name: "lookup" | "update", query: string) => Promise<string>;

export function createTicketWorkflow(
  tool: Tool,
  approved = false,
): ReturnType<typeof createWorkflow> {
  throw new Error("Not implemented: createTicketWorkflow");
}
