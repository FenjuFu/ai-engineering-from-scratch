window.AIFSProjectFigures.register("pj-agent-trace-debugger-1", {
  title: "Read a JSONL trace",
  steps: [
    { label: "Input contract", detail: "parseTrace" },
    {
      label: "Read a JSONL trace",
      detail:
        "Parse one JSON object per nonempty line. Require stable ids, names, finite start and end times, nonnegative token counts and an explicit ok or error state. A malformed line stops processing with its line number. Silently dropping bad spans would distort timing and cost conclusions. Times are relative milliseconds, not wall-clock timestamps.",
    },
    {
      label: "Observe the result",
      detail:
        "Valid JSONL becomes typed spans; a negative duration fails before analysis.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-agent-trace-debugger-2", {
  title: "Validate parent relationships",
  steps: [
    { label: "Input contract", detail: "validateTree" },
    {
      label: "Validate parent relationships",
      detail:
        "A child span must reference an existing parent and fit inside the parent interval. Check every ancestor chain for cycles and reject duplicate ids. Multiple roots are allowed because a trace can contain overlapping independent runs. Validation happens before aggregation so corrupted graphs cannot produce convincing charts.",
    },
    {
      label: "Observe the result",
      detail:
        "The graph rejects a plausible-looking child that ends after its parent.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-agent-trace-debugger-3", {
  title: "Separate work time from waiting time",
  steps: [
    { label: "Input contract", detail: "unionDuration, analyze" },
    {
      label: "Separate work time from waiting time",
      detail:
        "Inclusive duration is end minus start. Exclusive duration subtracts the union of immediate child intervals, not their sum, because parallel children overlap. Root interval union provides wall time across runs. Tokens are local per span and summed once. The slowest result names the span with greatest exclusive duration, avoiding a root that is mostly waiting on children.",
    },
    {
      label: "Observe the result",
      detail:
        "Overlapping child spans count once, and the model call becomes the largest owner of elapsed work.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-agent-trace-debugger-4", {
  title: "Render an inspectable timeline",
  steps: [
    { label: "Input contract", detail: "render" },
    {
      label: "Render an inspectable timeline",
      detail:
        "Generate a standalone HTML timeline with one row per span, scaled bars and error coloring. Escape span names before inserting them into markup. Include own time, total time, wall time, tokens and error count. Empty traces still produce a readable artifact. The output is a local static report and does not load third-party scripts.",
    },
    {
      label: "Observe the result",
      detail:
        "Open trace.html to see the failing model span in red and compare own time with inclusive time.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
