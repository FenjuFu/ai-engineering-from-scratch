# Price with checked integers

> (100 - 40)*2 + 40*1 + 20*5 = 260 nano-dollars

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Account for usage and budgets with integer arithmetic. This stage implements `cost` in `stage3.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

The fixture rate card uses nano-dollars per token. Charge uncached input, cached input and output at separate rates. Every multiplication and sum is checked for overflow, and no floating-point rounding can silently change the bill.

## Work through one case

(100 - 40)*2 + 40*1 + 20*5 = 260 nano-dollars. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-token-counter-and-cost-meter-3
```

## Your task

```rust
pub fn cost(usage:&Usage,rates:&Rates)->Result<u64,Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py token-counter-and-cost-meter --stage 3 --path /tmp/token-counter-and-cost-meter-work
```

The stage checks weighted, zero_rates, all_cached, overflow, invalid_usage. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_mul). Build an explicit approximate tokenizer, exact recorded-usage accounting, rate-card cost calculation and budget admission. Estimates are labeled and never presented as provider tokenizer counts. Prices are fixture inputs rather than claims about current provider pricing.
