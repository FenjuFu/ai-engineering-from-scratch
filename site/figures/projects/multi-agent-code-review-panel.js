window.AIFSProjectFigures.register("pj-multi-agent-code-review-panel-1", {
  title: "Validate reviewer evidence",
  steps: [
    { label: "Input contract", detail: "validateFinding" },
    {
      label: "Validate reviewer evidence",
      detail:
        "Require a file present in the supplied snapshot, a positive one-based line, an exact nonempty quote, a stable rule id and a severity from one through three. Evidence validation is shared across all reviewers. It protects the aggregation boundary against fabricated locations, but agreement and quoted text still do not prove a finding is correct.",
    },
    {
      label: "Observe the result",
      detail:
        "A supported quote enters the panel. A plausible finding on a nonexistent line is rejected.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-multi-agent-code-review-panel-2", {
  title: "Aggregate independent support",
  steps: [
    { label: "Input contract", detail: "aggregate" },
    {
      label: "Aggregate independent support",
      detail:
        "Group valid findings by file, line and rule. Count one vote per reviewer per group, reject duplicate reviewer identities, and retain every severity vote. A quorum produces consensus; a singleton remains visible as needs-review. A disagreement flag survives consensus so the user can inspect conflicting severity judgments.",
    },
    {
      label: "Observe the result",
      detail:
        "One reviewer repeating a finding stays at one vote; two reviewers with different severity values show consensus and disagreement.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-multi-agent-code-review-panel-3", {
  title: "Reserve costs and enforce deadlines",
  steps: [
    { label: "Input contract", detail: "runPanel" },
    {
      label: "Reserve costs and enforce deadlines",
      detail:
        "Reserve each reviewer cost before launching it. Skip work that cannot fit the remaining budget and record the decision. Race each reviewer against a deadline and abort its signal when time expires. Failures remain in the trace while completed reviews can still be aggregated. Adapters must honor AbortSignal to stop external work; the runner cannot force a remote service to cancel.",
    },
    {
      label: "Observe the result",
      detail:
        "The demo launches two reviewers, skips the third under budget, and preserves the severity disagreement.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-multi-agent-code-review-panel-4", {
  title: "Measure panel precision and recall",
  steps: [
    { label: "Input contract", detail: "evaluate" },
    {
      label: "Measure panel precision and recall",
      detail:
        "Evaluate unique finding ids against an expected set. Precision measures how many predicted findings are expected; recall measures how much of the expected set was found. Deduplicate both sets so repeated reviewers cannot inflate the metric. Zero predictions produce precision zero rather than a misleading perfect score. Try held-out inputs before adjusting quorum.",
    },
    {
      label: "Observe the result",
      detail:
        "False positives reduce precision while missed expected findings reduce recall; quorum is a tradeoff to measure.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
