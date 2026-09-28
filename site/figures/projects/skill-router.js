window.AIFSProjectFigures.register("pj-skill-router-1", {
  title: "Parse a typed skill catalog",
  steps: [
    { label: "Input contract", detail: "parseSkill, tokens" },
    {
      label: "Parse a typed skill catalog",
      detail:
        "A skill manifest declares an id, description, keywords, path patterns, priority, dependencies and permissions. Validate arrays and numbers at runtime rather than trusting a JSON cast. Tokenization normalizes punctuation and case and removes repeated words, so repeating a prompt cannot inflate its score.",
    },
    {
      label: "Observe the result",
      detail:
        "A skill with a path-shaped id fails immediately; repeated query words contribute once.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-router-2", {
  title: "Score words and repository paths",
  steps: [
    { label: "Input contract", detail: "matchPath, rank" },
    {
      label: "Score words and repository paths",
      detail:
        "Award two points for each matched keyword and three for each matched file path. Return score reasons alongside the score. Support star within one path segment and double-star across segments, escape regular expression punctuation, and reject absolute or parent-traversing file paths. Resolve tied scores by priority and then id so ranking is reproducible.",
    },
    {
      label: "Observe the result",
      detail:
        "Review plus a matching TypeScript file scores five, and each contribution is named.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-router-3", {
  title: "Resolve dependencies before execution",
  steps: [
    { label: "Input contract", detail: "plan" },
    {
      label: "Resolve dependencies before execution",
      detail:
        "Use depth-first traversal with separate active and visited sets. Active membership catches a cycle; visited membership avoids duplicate execution through a diamond. Validate permission requirements on dependencies as well as the selected skill. Emit dependencies before their consumers and reject unknown dependency ids instead of silently skipping work.",
    },
    {
      label: "Observe the result",
      detail:
        "A review request produces tests then review; a hidden write permission in a prerequisite blocks the whole plan.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-router-4", {
  title: "Abstain on ambiguous or blocked requests",
  steps: [
    { label: "Input contract", detail: "route" },
    {
      label: "Abstain on ambiguous or blocked requests",
      detail:
        "Join ranking and dependency planning while preserving four distinct outcomes: ready, no-match, ambiguous and blocked. A score gap below the margin is ambiguous even if the tie-breaker produces a first result. A ranked winner can still be blocked by permissions. Return the ranked explanations in every outcome so a caller can display the decision.",
    },
    {
      label: "Observe the result",
      detail:
        "The CLI prints a ready decision, ranked evidence and the ordered two-skill execution plan.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
