# Admit work against a ledger

> spent 740 + quote 260 = limit 1000 -> accepted

**Type:** Build
**Languages:** Rust
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Account for usage and budgets with integer arithmetic. This stage implements `reserve` in `stage4.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Reserve a quoted amount only if spent plus quote is within the configured limit. An exact boundary is accepted; a rejected reservation never mutates the ledger. This example is single-process accounting and does not claim concurrent distributed guarantees.

## Work through one case

spent 740 + quote 260 = limit 1000 -> accepted. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-token-counter-and-cost-meter-4
```

## Your task

```rust
pub fn reserve(spent:&mut u64,quote:u64,limit:u64)->Result<u64,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py token-counter-and-cost-meter --stage 4 --path /tmp/token-counter-and-cost-meter-work
```

The stage checks normal, boundary, reject_atomic, overflow_atomic, zero. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_mul). Build an explicit approximate tokenizer, exact recorded-usage accounting, rate-card cost calculation and budget admission. Estimates are labeled and never presented as provider tokenizer counts. Prices are fixture inputs rather than claims about current provider pricing.
