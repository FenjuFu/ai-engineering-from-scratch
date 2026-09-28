# Validate an unambiguous call envelope

> c1|reader|read|notes.md -> bounded typed request

**Type:** Build
**Languages:** Rust
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Authorize structured tool requests before they cross a side-effect boundary. This stage implements `call` in `stage1.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Parse a bounded four-field envelope using a pipe delimiter for this local exercise. Reject missing identity, control characters and overlong input. This grammar is intentionally narrower than JSON and must not be quietly reused as a general wire protocol.

## Work through one case

c1|reader|read|notes.md -> bounded typed request. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-tool-call-firewall-1
```

## Your task

```rust
pub fn call(line:&str,max_bytes:usize)->Result<Call,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py tool-call-firewall --stage 1 --path /tmp/tool-call-firewall-work
```

The stage checks valid, empty_id, extra_field, control, limit. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). Build a deny-by-default policy evaluator with bounded arguments, role permissions, single-use approvals and a structured audit log. The artifact is a library gate; applications must place it before every real tool execution.
