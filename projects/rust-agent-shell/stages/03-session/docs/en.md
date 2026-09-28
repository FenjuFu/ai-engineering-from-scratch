# Track budgets and terminal state

> Wrap the tools in a session that owns its root, request count and closed state.

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Wrap the tools in a session that owns its root, request count and closed state. Every parsed request, including rejected commands, consumes one action slot. Quit is terminal. A request beyond the budget emits a terminal error. Distinguish parsing rejection from an execution error so callers can repair a command without confusing it with a missing file.

## Why Rust

Rust makes ownership of the backend, file handles and action state explicit. Return `Result` for invalid inputs and system-call errors, then preserve the failure at the CLI boundary. The implementation uses the standard library and compiles with `rustc --edition 2021`; no package installation is required.

## Predict

Choose an accepted input and a rejected input before changing code. Write down the exact output or error you expect. Identify the first side effect and the checks that must run before it.

## Interactive lab

```figure
pj-rust-agent-shell-3
```

Advance through the contract, state transition and observable result. An invalid input must stop before the transition. Explain which piece of state prevents the next action after a failure.

## Build

Implement `Session.new, Session.handle` in your workspace `main.rs`. Keep earlier stages working. Read the function signatures and tests first, then implement one boundary at a time. The fixture is a deterministic test backend, and its results do not establish native operating-system behavior.

The stream distinguishes rejected grammar, failed filesystem actions and terminal session closure.

## Verify

```bash
python3 scripts/project_test.py rust-agent-shell --init learning-artifacts/rust-agent-shell
python3 scripts/project_test.py rust-agent-shell --stage 3 --path learning-artifacts/rust-agent-shell --strict
```

Initialize only once. The grader compiles tests against the learner path through `PROJECT_WORKSPACE`. Missing functions or intentional starter failures must fail; reference code is never imported as a fallback.

## What you see

The stream distinguishes rejected grammar, failed filesystem actions and terminal session closure.

The stage suite covers ordinary input, boundary conditions and rejected behavior. After completing all stages, compile and run the actual program:

```bash
rustc --edition 2021 learning-artifacts/rust-agent-shell/main.rs -o /tmp/rust-agent-shell
/tmp/rust-agent-shell --demo
```

## Ship it

Keep a fixture you wrote and a short explanation of one rejected action in your learner workspace. State whether you tested only the fixture or an optional native adapter. Preserve that distinction in any demonstration or scorecard.
