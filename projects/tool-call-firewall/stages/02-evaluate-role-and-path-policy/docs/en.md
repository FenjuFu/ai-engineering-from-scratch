# Evaluate role and path policy

> editor write -> approval-required; reader write -> deny

**Type:** Build
**Languages:** Rust
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Authorize structured tool requests before they cross a side-effect boundary. This stage implements `decide` in `stage2.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Only reader and editor roles exist. Reads use relative paths; writes require the editor role and approval. Reject parent components, absolute paths, hidden top-level paths and unknown tools. This checks lexical policy; the actual file adapter must enforce symlink-safe containment.

## Work through one case

editor write -> approval-required; reader write -> deny. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-tool-call-firewall-2
```

## Your task

```rust
pub fn decide(c:&Call)->Decision
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py tool-call-firewall --stage 2 --path /tmp/tool-call-firewall-work
```

The stage checks read, write_reader, approval, traversal, unknown. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). Build a deny-by-default policy evaluator with bounded arguments, role permissions, single-use approvals and a structured audit log. The artifact is a library gate; applications must place it before every real tool execution.
