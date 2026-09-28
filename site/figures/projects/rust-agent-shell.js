window.AIFSProjectFigures.register("pj-rust-agent-shell-1", {
  title: "Parse a deliberately small action language",
  steps: [
    { label: "Validate input", detail: "Action, parse_action" },
    {
      label: "Apply the boundary",
      detail:
        "Define an action enum for help, pwd, list, read, literal search and quit. Unknown commands are rejected, including shell-like instructions. Search separates its pattern and path with a tab so spaces remain valid inside either argument. Parsing never invokes a subprocess and has a 4096-byte input limit. This is a model-agnostic tool loop, not a natural-language model or an operating-system shell.",
    },
    {
      label: "Inspect output",
      detail:
        "The parser produces Read for a file with spaces and rejects exec without running anything.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-rust-agent-shell-2", {
  title: "Confine file tools to a bounded root",
  steps: [
    { label: "Validate input", detail: "contained, read_text, execute" },
    {
      label: "Apply the boundary",
      detail:
        "Canonicalize the workspace root and requested targets, reject absolute and parent-traversing paths, and verify that symlinks remain inside the root. Limit text reads to 16 KiB, directory results to 100 entries and searches to 50 matching lines. These are application-level constraints for a trusted local workspace; hostile concurrent symlink replacement requires stronger OS primitives or isolation.",
    },
    {
      label: "Inspect output",
      detail:
        "A read outside the canonical root is rejected, while a literal search returns one-based source lines.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-rust-agent-shell-3", {
  title: "Track budgets and terminal state",
  steps: [
    { label: "Validate input", detail: "Session.new, Session.handle" },
    {
      label: "Apply the boundary",
      detail:
        "Wrap the tools in a session that owns its root, request count and closed state. Every parsed request, including rejected commands, consumes one action slot. Quit is terminal. A request beyond the budget emits a terminal error. Distinguish parsing rejection from an execution error so callers can repair a command without confusing it with a missing file.",
    },
    {
      label: "Inspect output",
      detail:
        "The stream distinguishes rejected grammar, failed filesystem actions and terminal session closure.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
window.AIFSProjectFigures.register("pj-rust-agent-shell-4", {
  title: "Stream bounded JSON events through real stdin",
  steps: [
    {
      label: "Validate input",
      detail: "read_bounded, json_string, Event.json, run_loop",
    },
    {
      label: "Apply the boundary",
      detail:
        "Read input incrementally with BufRead and cap each line before allocating an unbounded string. Process the last unterminated line at EOF and accept CRLF. Escape control characters in JSON output and flush after each event so a parent agent sees results immediately. The demo compiles the actual binary and feeds the same loop a deterministic script. Interactive mode reads the user terminal until quit, EOF or the action budget.",
    },
    {
      label: "Inspect output",
      detail:
        "Compile main.rs, run the binary with a workspace path, and type help. Each input produces one flushed JSON event; quit stops before later input is read.",
    },
  ],
  caption: "Reject invalid input before the side effect.",
});
