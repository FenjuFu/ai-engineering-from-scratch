# Report residual assumptions

> selected microvm-fixture -> policy simulation, runtime proof still required

**Type:** Build
**Languages:** Rust
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Choose isolation controls from an explicit capability requirement. This stage implements `plan` in `stage4.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Return the selected fixture and state clearly that operating-system enforcement has not been performed. List shared-kernel and enabled-network residuals from the selected controls, and reject a profile that fails the original requirements. The report is an input to deployment review.

## Work through one case

selected microvm-fixture -> policy simulation, runtime proof still required. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-sandbox-ladder-4
```

## Your task

```rust
pub fn plan(n:&Needs,p:&Profile)->Result<String,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py sandbox-ladder --stage 4 --path /tmp/sandbox-ladder-work
```

The stage checks honest, shared_kernel, microvm, insufficient, verification. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://docs.docker.com/engine/security/). Build a policy simulator for four isolation profiles, requirement matching and residual-risk reports. Profiles are modeled fixtures. This project does not start containers or virtual machines and does not provide operating-system isolation.
