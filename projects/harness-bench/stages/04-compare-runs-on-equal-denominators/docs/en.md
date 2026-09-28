# Compare runs on equal denominators

> 2/2 outranks 1/2; 2/3 cannot join a two-case comparison

**Type:** Build
**Languages:** Go
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Compare harness behavior under the same tasks and call budget. This stage implements `Leaderboard` in `stage4.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Validate counters before ranking. Require every result to use the same total case count, reject duplicate harness names and rank by correct count followed by fewer errors and lexical name. The output states that scores are local fixture measurements, not model rankings.

## Work through one case

2/2 outranks 1/2; 2/3 cannot join a two-case comparison. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-harness-bench-4
```

## Your task

```go
func Leaderboard(results []Result)(string,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py harness-bench --stage 4 --path /tmp/harness-bench-work
```

The stage checks Rank, Denominator, Counter, Duplicate, Ties. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://pkg.go.dev/testing). Build a deterministic evaluation harness with strict case ingestion, normalized exact-match scoring, per-run accounting and stable leaderboard output. The reference model is a local fixture function; benchmark numbers describe these cases, not general model capability.
