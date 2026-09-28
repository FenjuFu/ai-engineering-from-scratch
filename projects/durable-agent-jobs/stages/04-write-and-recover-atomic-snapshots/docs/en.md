# Write and recover atomic snapshots

> write temporary -> sync -> rename -> load validated ledger

**Type:** Build
**Languages:** Go
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Persist job states and reject stale worker completions. This stage implements `ValidateJobs, Save, Load` in `stage4.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Validate every record and reject duplicate IDs before writing. Use a temporary file in the destination directory, flush it, close it and rename it to the snapshot path. Load rejects unknown JSON fields and trailing data. This is local atomic replacement, not a multi-writer transaction.

## Work through one case

write temporary -> sync -> rename -> load validated ledger. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-durable-agent-jobs-4
```

## Your task

```go
func ValidateJobs(jobs []Job)error
func Save(file string,jobs []Job)error
func Load(file string)([]Job,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py durable-agent-jobs --stage 4 --path /tmp/durable-agent-jobs-work
```

The stage checks Roundtrip, Duplicate, Truncated, UnknownField, PreserveOnInvalid. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://pkg.go.dev/os#Rename). Build a local job ledger with explicit transitions, versioned claims, lease expiry and atomic snapshot files. The store assumes one process owns the ledger; production multi-process coordination needs a transactional database or lock service.
