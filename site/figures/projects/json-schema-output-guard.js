window.AIFSProjectFigures.register("pj-json-schema-output-guard-1", {
  title: "Parse the untrusted boundary",
  steps: [
    { label: "Input contract", detail: "parseJSON" },
    {
      label: "Parse the untrusted boundary",
      detail:
        "A model response is a byte string. Parse the entire string as JSON, reject markdown wrappers and trailing text, and cap its UTF-8 byte size before parsing. Accept JSON primitives as well as objects: the schema, not the parser, determines whether a primitive is useful. Do not remove text until it happens to parse because that hides the actual output contract.",
    },
    {
      label: "Observe the result",
      detail:
        "The parser returns a value for valid JSON and throws for trailing instructions or an oversized response.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-json-schema-output-guard-2", {
  title: "Walk a schema recursively",
  steps: [
    { label: "Input contract", detail: "validate" },
    {
      label: "Walk a schema recursively",
      detail:
        "Implement object, array and primitive validation. Required properties are checked with own-property semantics. An inherited property does not satisfy the contract. Treat integer as a refinement of number, reject non-finite numbers, and preserve a path for every failure. Bound recursive descent at depth 32 so a schema and value cannot consume the stack indefinitely.",
    },
    {
      label: "Observe the result",
      detail:
        "A nested wrong type produces a path such as `$/a/0`; the caller can ask for a targeted correction.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-json-schema-output-guard-3", {
  title: "Reject ambiguous and unsupported contracts",
  steps: [
    { label: "Input contract", detail: "validate, guard" },
    {
      label: "Reject ambiguous and unsupported contracts",
      detail:
        "Add numeric bounds, enum membership, minimum Unicode string length, array bounds, and closed objects. Escape slash and tilde inside property paths. A keyword outside this educational subset is a configuration error, not silent success. This implementation intentionally does not claim complete JSON Schema conformance: references, formats and combinators require additional work.",
    },
    {
      label: "Observe the result",
      detail:
        "The guard returns structured issues for invalid output while unsupported schema features throw a configuration error.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-json-schema-output-guard-4", {
  title: "Repair with a finite budget",
  steps: [
    { label: "Input contract", detail: "repair" },
    {
      label: "Repair with a finite budget",
      detail:
        "Feed only structured validation feedback into a generation callback. Count each call before interpreting its output. Stop immediately after acceptance and return an explicit exhausted state after the final rejected attempt. Provider failures propagate instead of being disguised as schema failures. The trace records each attempt so a successful third response does not conceal two earlier contract violations.",
    },
    {
      label: "Observe the result",
      detail:
        "The demo rejects confidence 1.5, passes an above-maximum issue to the next attempt, then accepts confidence 0.9.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
