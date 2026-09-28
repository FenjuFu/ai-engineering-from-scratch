(function () {
  "use strict";
  const controls = [
    {
      key: "limit",
      label: "Budget units",
      type: "range",
      value: 100,
      min: 10,
      max: 200,
      step: 1,
    },
    {
      key: "hold",
      label: "Requested reservation",
      type: "range",
      value: 60,
      min: 0,
      max: 150,
      step: 1,
    },
    {
      key: "actual",
      label: "Actual receipt",
      type: "range",
      value: 35,
      min: 0,
      max: 150,
      step: 1,
    },
    {
      key: "spent",
      label: "Earlier spending",
      type: "range",
      value: 20,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      key: "timeout",
      label: "Receipt missing",
      type: "checkbox",
      value: false,
    },
  ];
  const calculate = function (v, stepIndex) {
    const available = v.limit - v.spent;
    const admitted = v.hold <= available;
    const settled = admitted && !v.timeout && v.actual <= v.hold;
    const spent = v.spent + (settled ? v.actual : 0),
      held = admitted && !settled ? v.hold : 0;
    return {
      summary: !admitted
        ? "Reject before dispatch"
        : settled
          ? "Receipt settled; unused reservation released"
          : "Keep hold for reconciliation",
      metrics: [
        { label: "Available before dispatch", value: available },
        { label: "Unused released", value: settled ? v.hold - v.actual : 0 },
      ],
      bars: [
        { label: "Settled spending", value: spent, max: v.limit },
        { label: "Unresolved holds", value: held, max: v.limit },
        {
          label: "Remaining capacity",
          value: Math.max(0, v.limit - spent - held),
          max: v.limit,
        },
      ],
    };
  };
  window.AIFSProjectFigures.register(
    "pj-agent-budget-planner-1",
    Object.assign(
      {
        title: "Estimate requests in integer microcredits",
        steps: [
          {
            label: "Tokens",
            detail: "Separate input tokens and output ceiling.",
          },
          { label: "Rates", detail: "Use integer per-token teaching units." },
          { label: "Estimate", detail: "Compute a conservative reservation." },
        ],
        caption:
          "Validate nonnegative integer token counts and rates, then compute the worst-case cost..",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-agent-budget-planner-2",
    Object.assign(
      {
        title: "Reserve capacity before dispatch",
        steps: [
          {
            label: "Available",
            detail: "Subtract spending and current holds.",
          },
          {
            label: "Check",
            detail: "Reject duplicate ids and insufficient capacity.",
          },
          { label: "Reserve", detail: "Return a new ledger with the hold." },
        ],
        caption: "Return a new ledger with a unique request reservation.",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-agent-budget-planner-3",
    Object.assign(
      {
        title: "Settle actual usage and release unused budget",
        steps: [
          {
            label: "Receipt",
            detail: "Find the original request reservation.",
          },
          { label: "Bounds", detail: "Check actual cost against the ceiling." },
          {
            label: "Settle",
            detail: "Move cost to spending and release the hold.",
          },
        ],
        caption:
          "Settle each request exactly once with actual cost no greater than its reservation.",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-agent-budget-planner-4",
    Object.assign(
      {
        title: "Schedule within cost and time limits",
        steps: [
          { label: "Deadline", detail: "Check predicted completion time." },
          { label: "Budget", detail: "Reserve and settle admitted requests." },
          { label: "Trace", detail: "Retain rejected and completed states." },
        ],
        caption:
          "Schedule known job estimates under integer cost and millisecond limits.",
      },
      { lab: { controls, calculate } },
    ),
  );
})();
