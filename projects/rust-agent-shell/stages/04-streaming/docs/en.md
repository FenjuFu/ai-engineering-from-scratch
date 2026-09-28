# Stream bounded JSON events through real stdin

> Read input incrementally with BufRead and cap each line before allocating an unbounded string.

**Type:** Build
**Languages:** Rust
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Read input incrementally with BufRead and cap each line before allocating an unbounded string. Process the last unterminated line at EOF and accept CRLF. Escape control characters in JSON output and flush after each event so a parent agent sees results immediately. The demo compiles the actual binary and feeds the same loop a deterministic script. Interactive mode reads the user terminal until quit, EOF or the action budget.

## Why Rust

Rust makes ownership of the backend, file handles and action state explicit. Return `Result` for invalid inputs and system-call errors, then preserve the failure at the CLI boundary. The implementation uses the standard library and compiles with `rustc --edition 2021`; no package installation is required.

## Predict

Choose an accepted input and a rejected input before changing code. Write down the exact output or error you expect. Identify the first side effect and the checks that must run before it.

## Interactive lab

```figure
pj-rust-agent-shell-4
```

Advance through the contract, state transition and observable result. An invalid input must stop before the transition. Explain which piece of state prevents the next action after a failure.

## Build

Implement `read_bounded, json_string, Event.json, run_loop` in your workspace `main.rs`. Keep earlier stages working. Read the function signatures and tests first, then implement one boundary at a time. The fixture is a deterministic test backend, and its results do not establish native operating-system behavior.

Compile main.rs, run the binary with a workspace path, and type help. Each input produces one flushed JSON event; quit stops before later input is read.

## Verify

```bash
python3 scripts/project_test.py rust-agent-shell --init learning-artifacts/rust-agent-shell
python3 scripts/project_test.py rust-agent-shell --stage 4 --path learning-artifacts/rust-agent-shell --strict
```

Initialize only once. The grader compiles tests against the learner path through `PROJECT_WORKSPACE`. Missing functions or intentional starter failures must fail; reference code is never imported as a fallback.

## What you see

Compile main.rs, run the binary with a workspace path, and type help. Each input produces one flushed JSON event; quit stops before later input is read.

The stage suite covers ordinary input, boundary conditions and rejected behavior. After completing all stages, compile and run the actual program:

```bash
rustc --edition 2021 learning-artifacts/rust-agent-shell/main.rs -o /tmp/rust-agent-shell
/tmp/rust-agent-shell --demo
```

## Ship it

Keep a fixture you wrote and a short explanation of one rejected action in your learner workspace. State whether you tested only the fixture or an optional native adapter. Preserve that distinction in any demonstration or scorecard.
