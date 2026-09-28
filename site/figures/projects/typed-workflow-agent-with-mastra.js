window.AIFSProjectFigures.register("pj-typed-workflow-agent-with-mastra-1", {
  title: "Define runtime contracts for typed steps",
  steps: [
    { label: "Input contract", detail: "parseTicket, classify" },
    {
      label: "Define runtime contracts for typed steps",
      detail:
        "Start with a ticket id and message. Validate unknown input before classification. Classify explicit mutation verbs as write intent and route other requests to lookup. This deterministic classifier is a baseline with obvious limits: natural-language intent cannot be secured by a word list. The later approval gate is attached to the selected tool, not confidence in the wording.",
    },
    {
      label: "Observe the result",
      detail:
        "Read and write intent become typed values, and malformed tickets fail before a tool is selected.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-typed-workflow-agent-with-mastra-2", {
  title: "Validate tool plans and approval requirements",
  steps: [
    { label: "Input contract", detail: "makePlan, validatePlan" },
    {
      label: "Validate tool plans and approval requirements",
      detail:
        "Construct a plan with lookup for read intent and update for write intent. Revalidate plans at execution because checkpoints are serialized data. Require the approval flag to equal the presence of an update action. An attacker cannot turn a saved write checkpoint into an automatically executable read by changing one boolean.",
    },
    {
      label: "Observe the result",
      detail:
        "A checkpoint containing update cannot pass validation with requiresApproval set to false.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-typed-workflow-agent-with-mastra-3", {
  title: "Suspend, resume and bound retries",
  steps: [
    { label: "Input contract", detail: "executePlan, runTicket" },
    {
      label: "Suspend, resume and bound retries",
      detail:
        "Execute each action with a per-action attempt limit and a shared call budget. Count failed calls against the total. Suspend before any mutation when approval is absent, returning a copy of the plan as the checkpoint. Resume by passing the checkpoint with explicit approval. Empty tool output is a failure, not a successful answer. The in-memory runner has no crash recovery during an action; real side effects need idempotency keys.",
    },
    {
      label: "Observe the result",
      detail:
        "The demo shows a completed lookup, a suspended update and a completed approved resumption.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-typed-workflow-agent-with-mastra-4", {
  title: "Compare the scratch runtime with Mastra",
  steps: [
    { label: "Input contract", detail: "runTicket, executePlan" },
    {
      label: "Compare the scratch runtime with Mastra",
      detail:
        "Keep the baseline dependency-free, then inspect solution/optional-mastra/adapter.ts. It defines Zod input and output schemas for three real Mastra steps, composes them with then and commit, and executes with createRun/start. Deterministic injected tools let the optional test suite compare returned business results with the scratch workflow without API keys. The stage grader tests the framework-independent boundary; run the separate optional suite to verify the actual installed framework.",
    },
    {
      label: "Observe the result",
      detail:
        "Core tests pass offline. For real framework parity, run `cd projects/typed-workflow-agent-with-mastra/solution/optional-mastra && npm install --ignore-scripts --package-lock=false && node --test adapter.test.ts`. The optional package pins Mastra 1.71.0 and Zod 4.3.6; it is the explicit framework comparison extension to the stdlib baseline.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
