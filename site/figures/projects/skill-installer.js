window.AIFSProjectFigures.register("pj-skill-installer-1", {
  title: "Validate a portable bundle",
  steps: [
    { label: "Input contract", detail: "safePath, validate" },
    {
      label: "Validate a portable bundle",
      detail:
        "Accept a named bundle with a SKILL.md and optional reference files. Validate every relative path before touching disk. Reject dot segments, absolute paths, drive prefixes, backslashes and reserved installation metadata. Limit each text file to 100 KB. The installer reads an in-memory bundle, leaving network fetching and signature trust as separate responsibilities.",
    },
    {
      label: "Observe the result",
      detail:
        "Portable reference paths pass; every escape path is rejected before filesystem mutation.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-installer-2", {
  title: "Translate metadata and hash content",
  steps: [
    { label: "Input contract", detail: "digest, translate" },
    {
      label: "Translate metadata and hash content",
      detail:
        "Keep one body of instructions while regenerating a small quoted metadata header. Preserve references byte-for-byte. Compute a SHA-256 digest over sorted path/content pairs, so file insertion order cannot change integrity. The digest detects changed content but does not establish publisher identity; obtaining a trusted expected digest is the caller's responsibility.",
    },
    {
      label: "Observe the result",
      detail:
        "All three agent adapters share content while installation directories differ; the digest changes when any reference changes.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-installer-3", {
  title: "Install atomically within a root",
  steps: [
    { label: "Input contract", detail: "install" },
    {
      label: "Install atomically within a root",
      detail:
        "Check the expected digest before creating directories. Inspect each agent directory with lstat and reject symlinks. Stage the complete translated bundle beside the destination, then rename it. An existing managed installation moves to a temporary backup so a failed final rename can restore it. This educational transaction assumes a single trusted local writer; hostile concurrent filesystem replacement requires OS-level isolation.",
    },
    {
      label: "Observe the result",
      detail:
        "A valid bundle appears completely under its agent directory; a wrong digest leaves an empty root.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-skill-installer-4", {
  title: "Protect edits during upgrades",
  steps: [
    { label: "Input contract", detail: "install" },
    {
      label: "Protect edits during upgrades",
      detail:
        "Before replacing an installation, verify that every tracked file still matches the prior digest and no unmanaged files have appeared. Refuse upgrades when users edited a tracked file or added their own file. The user can move those changes into the source bundle deliberately. Successful repeated installs leave no staging or backup directories behind.",
    },
    {
      label: "Observe the result",
      detail:
        "A second unchanged install succeeds. Editing SKILL.md makes the next upgrade fail while retaining the edit.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
