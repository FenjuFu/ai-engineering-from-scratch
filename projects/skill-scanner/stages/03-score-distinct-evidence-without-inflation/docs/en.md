# Score distinct evidence without inflation

> same rule and line repeated twice -> charged once

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Find risky instruction patterns with exact source evidence. This stage implements `risk_score` in `stage3.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Count each rule once per source line even if a collector repeats a finding. Sum severity with checked arithmetic. Reject out-of-range severities and impossible offsets so malformed scanner data cannot masquerade as a low score.

## Work through one case

same rule and line repeated twice -> charged once. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-skill-scanner-3
```

## Your task

```rust
pub fn risk_score(findings:&[Finding])->Result<u32,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py skill-scanner --stage 3 --path /tmp/skill-scanner-work
```

The stage checks distinct, dedup, separate_lines, invalid, empty. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://agentskills.io/specification). Build an offline advisory scanner that preserves UTF-8 offsets, reports explicit policy patterns, scores distinct findings and emits a review gate. It is a transparent heuristic, not a malware detector or a promise that unflagged skills are safe.
