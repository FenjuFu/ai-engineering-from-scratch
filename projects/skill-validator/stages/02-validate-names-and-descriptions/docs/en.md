# Validate names and descriptions

> folder code-review + name code-review -> accepted

**Type:** Build
**Languages:** Rust
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Validate skill metadata and load only the context the task needs. This stage implements `validate` in `stage2.rs`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

The loader accepts only lowercase names of 1 to 64 bytes with single interior hyphens, no leading digit restriction, and a nonblank description up to 1024 characters. Validate the skill directory name against metadata so discovery cannot silently rename a package.

## Work through one case

folder code-review + name code-review -> accepted. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-skill-validator-2
```

## Your task

```rust
pub fn validate(fields: &std::collections::BTreeMap<String,String>, directory: &str) -> Result<Skill, Error>
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py skill-validator --stage 2 --path /tmp/skill-validator-work
```

The stage checks valid, name_mismatch, uppercase, missing_description, double_hyphen. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://agentskills.io/specification). Build a bounded Agent Skills loader with a deliberately small frontmatter grammar, strict metadata validation, safe reference paths, and progressive disclosure. The supported YAML subset is explicit; unsupported forms fail instead of being guessed.
