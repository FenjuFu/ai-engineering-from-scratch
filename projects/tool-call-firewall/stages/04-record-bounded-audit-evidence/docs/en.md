# Record bounded audit evidence

> one call -> one audit row; full log -> explicit limit

**Type:** Build
**Languages:** Rust
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Authorize structured tool requests before they cross a side-effect boundary. This stage implements `audit` in `stage4.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Format a stable tab-separated audit row after the policy decision. Reject duplicate call IDs and cap retained entries. Arguments are omitted to avoid logging secret contents; IDs, role, tool and decision remain sufficient to count authorization outcomes.

## Work through one case

one call -> one audit row; full log -> explicit limit. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-tool-call-firewall-4
```

## Your task

```rust
pub fn audit(log:&mut Vec<String>,c:&Call,d:&Decision,max_entries:usize)->Result<(),Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py tool-call-firewall --stage 4 --path /tmp/tool-call-firewall-work
```

The stage checks append, no_arguments, duplicate, cap, deny_logged. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). Build a deny-by-default policy evaluator with bounded arguments, role permissions, single-use approvals and a structured audit log. The artifact is a library gate; applications must place it before every real tool execution.
