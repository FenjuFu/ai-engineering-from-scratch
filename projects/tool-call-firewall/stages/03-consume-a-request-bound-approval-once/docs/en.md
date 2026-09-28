# Consume a request-bound approval once

> approve call 1 -> one successful authorization; replay -> conflict

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Authorize structured tool requests before they cross a side-effect boundary. This stage implements `authorize` in `stage3.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

An approval stores the complete typed request: ID, role, tool and argument. It is consumed only for an approval-required decision. A mismatched, used or denied request fails without mutating the approval. Changing arguments while retaining the same displayed ID is a conflict. The application creates this record only after the user approves that exact request.

## Work through one case

approve call 1 -> one successful authorization; replay -> conflict. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-tool-call-firewall-3
```

## Your task

```rust
pub fn authorize(c:&Call,approval:Option<&mut Approval>)->Result<(),Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py tool-call-firewall --stage 3 --path /tmp/tool-call-firewall-work
```

The stage checks consume, replay, wrong_id, missing, read_no_approval. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). Build a deny-by-default policy evaluator with bounded arguments, role permissions, single-use approvals and a structured audit log. The artifact is a library gate; applications must place it before every real tool execution.
