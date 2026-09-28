window.AIFSProjectFigures.register("pj-memory-server-1", {
  title: "Keep text, namespace and provenance together",
  steps: [
    { label: "Input contract", detail: "validateMemory, embed" },
    {
      label: "Keep text, namespace and provenance together",
      detail:
        "Every memory needs a bounded id, namespace, text and source locator. Never return a detached string without its provenance. The small feature-hashing embedding maps normalized terms into a fixed vector; it is a deterministic lexical projection, not a pretrained semantic model. Hash collisions are expected and explain why lexical evidence remains part of retrieval.",
    },
    {
      label: "Observe the result",
      detail:
        "The vector has 32 buckets, while each record retains a readable source locator.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-memory-server-2", {
  title: "Serialize revisioned writes",
  steps: [
    { label: "Input contract", detail: "MemoryStore.put, MemoryStore.list" },
    {
      label: "Serialize revisioned writes",
      detail:
        "Load a versioned event log and reconstruct the latest record for each namespace/id pair. An update must name its expected revision. Serialize writes so two callers racing from revision zero cannot both succeed. Append before mutating the in-memory map. This is a single-process store: append completion is not a power-loss durability guarantee, and multiple server processes require an external lock or database.",
    },
    {
      label: "Observe the result",
      detail:
        "Two concurrent creates return one success and one revision conflict; reopening recovers the successful record.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-memory-server-3", {
  title: "Score vectors in a real Rust process",
  steps: [
    { label: "Input contract", detail: "cosineScores, MemoryStore.search" },
    {
      label: "Score vectors in a real Rust process",
      detail:
        "Compile score.rs with the standard Rust toolchain and send query and document vectors over stdin. Compute cosine similarity, returning zero for a zero-norm vector. Combine 60 percent lexical query coverage with 40 percent cosine score and use ids to break ties. Test dimensions and finite values before crossing the process boundary. The Rust binary is compiled into a private temporary directory.",
    },
    {
      label: "Observe the result",
      detail:
        "The Rust kernel scores identical vectors as 1.0 and search returns the matching memory with its source intact.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
window.AIFSProjectFigures.register("pj-memory-server-4", {
  title: "Expose REST and MCP tools",
  steps: [
    { label: "Input contract", detail: "createMemoryServer" },
    {
      label: "Expose REST and MCP tools",
      detail:
        "Bind a local server, require a bearer token, bound request bodies, and implement health, REST writes/search and the MCP initialization/tools subset over JSON-RPC POST. Tool execution failures use isError inside a successful JSON-RPC response; unknown protocol methods use a JSON-RPC error. This is a teaching subset without sessions, streaming or production authentication. Test actual HTTP bytes so serialization cannot drop source or revision.",
    },
    {
      label: "Observe the result",
      detail:
        "The demo performs an actual REST write and MCP search over loopback, then prints source, revision and score.",
    },
  ],
  caption: "Advance to inspect the boundary before the next effect.",
});
