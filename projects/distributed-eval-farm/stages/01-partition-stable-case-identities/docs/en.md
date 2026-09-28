# Partition stable case identities

> case IDs map once through FNV-1a modulo shard count

**Type:** Build
**Languages:** Go
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Partition cases, lease shards and aggregate bounded concurrent workers. This stage implements `Partition` in `stage1.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Assign each nonempty unique case ID to one of a positive number of shards using FNV-1a. The assignment depends on the ID and shard count, never arrival order. Changing the shard count deliberately remaps work and therefore requires a new evaluation run.

## Work through one case

case IDs map once through FNV-1a modulo shard count. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-distributed-eval-farm-1
```

## Your task

```go
func Partition(ids []string,shards int)([][]string,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py distributed-eval-farm --stage 1 --path /tmp/distributed-eval-farm-work
```

The stage checks Once, Deterministic, Duplicate, Zero, EmptyID. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://go.dev/blog/pipelines). Build the coordinator logic behind an evaluation farm: deterministic partitions, fenced leases, idempotent results and a real bounded goroutine worker pool. The reference deployment runs in one process; network transport and cross-process storage are explicit extension points.
