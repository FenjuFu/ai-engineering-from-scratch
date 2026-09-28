window.AIFSProjectFigures.register("pj-workflow-hooks-1", {
  title: "Capture corrections with provenance",
  steps: [
    { label: "Input contract", detail: "normalize, ingest" },
    {
      label: "Capture corrections with provenance",
      detail:
        "Require a correction id, session id, scope, rule and source excerpt. Normalize rule whitespace and case for comparison while preserving source evidence. Reject oversized values and obvious credential-shaped content. This heuristic is not a complete secret scanner: callers must redact source data before ingestion.",
    },
    {
      label: "Observe the result",
      detail:
        "A validated correction has a stable comparison form and an intact source locator.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-workflow-hooks-2", {
  title: "Count independent sessions",
  steps: [
    { label: "Input contract", detail: "consolidate" },
    {
      label: "Count independent sessions",
      detail:
        "Group by scope and normalized rule text. Deduplicate event ids and reject a reused id with different content. Count unique sessions rather than event count, so repeated hook delivery cannot promote a rule. Keep every source id attached to the candidate and sort the final output for reproducible files.",
    },
    {
      label: "Observe the result",
      detail:
        "Two events in one session produce one supporting session; two sessions remain a candidate until approval.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-workflow-hooks-3", {
  title: "Approve and select scoped rules",
  steps: [
    { label: "Input contract", detail: "transition, hook" },
    {
      label: "Approve and select scoped rules",
      detail:
        "Require independent-session support before an explicit approval transition. Retired rules cannot be silently resurrected. At hook time, include only approved rules matching the current scope or global scope. Return source ids with injected rule text so the user can trace where persistent guidance came from.",
    },
    {
      label: "Observe the result",
      detail:
        "Only an approved rule with matching scope appears in the hook payload; sources travel with it.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-workflow-hooks-4", {
  title: "Persist rules across sessions",
  steps: [
    { label: "Input contract", detail: "save, load" },
    {
      label: "Persist rules across sessions",
      detail:
        "Write a versioned JSON snapshot to a unique sibling temporary file with owner-only permissions, then rename it into place. Readers see the old or new complete file. Missing storage means an empty collection, while malformed storage is an error. This snapshot store supports one writer process; cross-process merge and locking are a separate extension.",
    },
    {
      label: "Observe the result",
      detail:
        "The demo writes rules.json, reloads it, and emits a scoped hook payload with two source ids.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
