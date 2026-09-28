# Group commits with stable ordering

> feat! appears under Breaking changes, not Features

**Type:** Build
**Languages:** Go
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Turn conventional commit records into a stable release note. This stage implements `Group` in `stage3.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Map breaking changes to their own section before feature and fix groups. Sort each group by hash so input order cannot alter the release artifact. The grouping function copies inputs, leaving the original export intact.

## Work through one case

feat! appears under Breaking changes, not Features. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-changelog-writer-from-git-3
```

## Your task

```go
func Group(commits []Commit)(map[string][]Commit,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py changelog-writer-from-git --stage 3 --path /tmp/changelog-writer-from-git-work
```

The stage checks Features, BreakingFirst, Stable, Unknown, Empty. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://git-scm.com/docs/pretty-formats). Build a parser for a bounded Git export, conventional-commit classification, deterministic grouping and Markdown release notes. Demo input is recorded locally, and a separate export command can read a real repository without modifying it.
