# Accept idempotent completion receipts

> same owner + version + result redelivered -> same success

**Type:** Build
**Languages:** Go
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Partition cases, lease shards and aggregate bounded concurrent workers. This stage implements `Submit` in `stage3.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

A completion carries shard owner, lease version and a nonempty result. Accept only the current owner before expiry; repeated identical completions return success, while conflicting data fails. Idempotence prevents redelivery from duplicating a result without silently replacing earlier evidence.

## Work through one case

same owner + version + result redelivered -> same success. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-distributed-eval-farm-3
```

## Your task

```go
func Submit(l *Lease,worker string,version int,now int64,result string)error
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py distributed-eval-farm --stage 3 --path /tmp/distributed-eval-farm-work
```

The stage checks Complete, Duplicate, Conflict, Stale, Expired. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://go.dev/blog/pipelines). Build the coordinator logic behind an evaluation farm: deterministic partitions, fenced leases, idempotent results and a real bounded goroutine worker pool. The reference deployment runs in one process; network transport and cross-process storage are explicit extension points.
