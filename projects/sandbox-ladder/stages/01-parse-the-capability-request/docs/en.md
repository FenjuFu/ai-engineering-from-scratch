# Parse the capability request

> untrusted=true,network=true -> request with explicit denied egress

**Type:** Build
**Languages:** Rust
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Choose isolation controls from an explicit capability requirement. This stage implements `needs` in `stage1.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Represent the threat model as four explicit booleans: untrusted code, secret-bearing host, denied network and required kernel separation. Reject unknown keys and ambiguous boolean values. A policy evaluator is only as useful as the request it actually understood.

## Work through one case

untrusted=true,network=true -> request with explicit denied egress. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-sandbox-ladder-1
```

## Your task

```rust
pub fn needs(text:&str)->Result<Needs,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py sandbox-ladder --stage 1 --path /tmp/sandbox-ladder-work
```

The stage checks defaults, network, unknown, ambiguous, duplicate. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://docs.docker.com/engine/security/). Build a policy simulator for four isolation profiles, requirement matching and residual-risk reports. Profiles are modeled fixtures. This project does not start containers or virtual machines and does not provide operating-system isolation.
