# Contain resource paths

> references/check.md -> canonical file inside the skill root

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Validate skill metadata and load only the context the task needs. This stage implements `reference_path` in `stage3.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Resolve resource names relative to a skill root. Reject absolute paths, parent components and Windows separators before joining, then canonicalize existing paths so a symlink cannot escape. Canonicalization checks the current filesystem; a production adversarial loader needs descriptor-relative opens to close later replacement races.

## Work through one case

references/check.md -> canonical file inside the skill root. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-skill-validator-3
```

## Your task

```rust
pub fn reference_path(root: &std::path::Path, resource: &str) -> Result<std::path::PathBuf, Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py skill-validator --stage 3 --path /tmp/skill-validator-work
```

The stage checks parent, absolute, windows, existing, missing. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://agentskills.io/specification). Build a bounded Agent Skills loader with a deliberately small frontmatter grammar, strict metadata validation, safe reference paths, and progressive disclosure. The supported YAML subset is explicit; unsupported forms fail instead of being guessed.
