# Confine file tools to a bounded root

> Canonicalize the workspace root and requested targets, reject absolute and parent-traversing paths, and verify that symlinks remain inside the root.

**Type:** Build
**Languages:** Rust
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Canonicalize the workspace root and requested targets, reject absolute and parent-traversing paths, and verify that symlinks remain inside the root. Limit text reads to 16 KiB, directory results to 100 entries and searches to 50 matching lines. These are application-level constraints for a trusted local workspace; hostile concurrent symlink replacement requires stronger OS primitives or isolation.

## Why Rust

Rust makes ownership of the backend, file handles and action state explicit. Return `Result` for invalid inputs and system-call errors, then preserve the failure at the CLI boundary. The implementation uses the standard library and compiles with `rustc --edition 2021`; no package installation is required.

## Predict

Choose an accepted input and a rejected input before changing code. Write down the exact output or error you expect. Identify the first side effect and the checks that must run before it.

## Interactive lab

```figure
pj-rust-agent-shell-2
```

Advance through the contract, state transition and observable result. An invalid input must stop before the transition. Explain which piece of state prevents the next action after a failure.

## Build

Implement `contained, read_text, execute` in your workspace `main.rs`. Keep earlier stages working. Read the function signatures and tests first, then implement one boundary at a time. The fixture is a deterministic test backend, and its results do not establish native operating-system behavior.

A read outside the canonical root is rejected, while a literal search returns one-based source lines.

## Verify

```bash
python3 scripts/project_test.py rust-agent-shell --init learning-artifacts/rust-agent-shell
python3 scripts/project_test.py rust-agent-shell --stage 2 --path learning-artifacts/rust-agent-shell --strict
```

Initialize only once. The grader compiles tests against the learner path through `PROJECT_WORKSPACE`. Missing functions or intentional starter failures must fail; reference code is never imported as a fallback.

## What you see

A read outside the canonical root is rejected, while a literal search returns one-based source lines.

The stage suite covers ordinary input, boundary conditions and rejected behavior. After completing all stages, compile and run the actual program:

```bash
rustc --edition 2021 learning-artifacts/rust-agent-shell/main.rs -o /tmp/rust-agent-shell
/tmp/rust-agent-shell --demo
```

## Ship it

Keep a fixture you wrote and a short explanation of one rejected action in your learner workspace. State whether you tested only the fixture or an optional native adapter. Preserve that distinction in any demonstration or scorecard.
