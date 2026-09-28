(function () {
  "use strict";
  const controls = [
    {
      key: "train",
      label: "Train text",
      type: "text",
      value: "Timeout after rollout",
    },
    {
      key: "test",
      label: "Test text",
      type: "text",
      value: " timeout AFTER rollout ",
    },
    {
      key: "trainGroup",
      label: "Train incident",
      type: "text",
      value: "incident-1",
    },
    {
      key: "testGroup",
      label: "Test incident",
      type: "text",
      value: "incident-2",
    },
    {
      key: "testRows",
      label: "Test rows",
      type: "range",
      value: 1,
      min: 0,
      max: 10,
      step: 1,
    },
  ];
  const calculate = function (v, stepIndex) {
    const normalize = (s) =>
      s.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
    const content = normalize(v.train) === normalize(v.test),
      group = v.trainGroup === v.testGroup;
    return {
      summary:
        v.testRows === 0
          ? "No evaluation partition"
          : content || group
            ? "Leakage found; inspect record ids"
            : "No normalized text or group overlap in these records",
      metrics: [
        { label: "Content overlaps", value: content ? 1 : 0 },
        { label: "Group overlaps", value: group ? 1 : 0 },
      ],
      bars: [
        { label: "Train rows", value: 1, max: 10 },
        { label: "Test rows", value: v.testRows, max: 10 },
      ],
      columns: ["record", "group", "normalized text"],
      rows: [
        ["train-a", v.trainGroup, normalize(v.train)],
        ["test-b", v.testGroup, normalize(v.test)],
      ],
    };
  };
  window.AIFSProjectFigures.register(
    "pj-dataset-split-auditor-1",
    Object.assign(
      {
        title: "Fingerprint normalized records",
        steps: [
          {
            label: "Normalize",
            detail: "NFKC resolves compatible Unicode forms.",
          },
          {
            label: "Collapse",
            detail: "Case folding and whitespace define equivalence.",
          },
          { label: "Hash", detail: "SHA-256 yields stable content ids." },
        ],
        caption:
          "Create stable SHA-256 fingerprints for text after NFKC normalization, case folding, and whitespace collapse..",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-dataset-split-auditor-2",
    Object.assign(
      {
        title: "Audit duplicate and group leakage",
        steps: [
          { label: "Validate", detail: "Require unique ids and group labels." },
          { label: "Index", detail: "Build sets for each partition." },
          {
            label: "Intersect",
            detail: "Report both kinds of shared evidence.",
          },
        ],
        caption:
          "Validate ids, text, and groups, then report intersections across train and test..",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-dataset-split-auditor-3",
    Object.assign(
      {
        title: "Split groups with stable hashing",
        steps: [
          { label: "Group", detail: "Use the group id as the split key." },
          {
            label: "Hash seed",
            detail: "Stable hashing creates a reproducible fraction.",
          },
          {
            label: "Partition",
            detail: "Move complete groups across the boundary.",
          },
        ],
        caption: "Return train and test arrays with no group overlap.",
      },
      { lab: { controls, calculate } },
    ),
  );
  window.AIFSProjectFigures.register(
    "pj-dataset-split-auditor-4",
    Object.assign(
      {
        title: "Report split size and leakage together",
        steps: [
          { label: "Counts", detail: "Measure rows and distinct groups." },
          { label: "Audit", detail: "Re-use the leakage checker." },
          {
            label: "Verdict",
            detail: "Require nonempty partitions and no leakage.",
          },
        ],
        caption:
          "Produce a JSON audit with partition sizes, group counts, and a usable flag requiring both nonempty partitions and no leakage..",
      },
      { lab: { controls, calculate } },
    ),
  );
})();
