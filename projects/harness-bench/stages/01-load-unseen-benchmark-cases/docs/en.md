# Load unseen benchmark cases

> two records share ID a -> benchmark rejected

**Type:** Build
**Languages:** Go
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Compare harness behavior under the same tasks and call budget. This stage implements `Cases` in `stage1.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Parse a JSON array with stable case IDs, prompts and expected answers. Reject unknown fields, duplicate IDs, empty fields and a dataset larger than the configured case budget. Keeping the dataset outside the harness function makes leakage visible during review.

## Work through one case

two records share ID a -> benchmark rejected. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-harness-bench-1
```

## Your task

```go
func Cases(data []byte,max int)([]Case,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py harness-bench --stage 1 --path /tmp/harness-bench-work
```

The stage checks Valid, Unknown, Duplicate, Bound, Missing. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://pkg.go.dev/testing). Build a deterministic evaluation harness with strict case ingestion, normalized exact-match scoring, per-run accounting and stable leaderboard output. The reference model is a local fixture function; benchmark numbers describe these cases, not general model capability.
