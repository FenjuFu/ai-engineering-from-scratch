# Reject stale observations and exhausted budgets

> Place a Controller around the backend.

**Type:** Build
**Languages:** Rust
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Place a Controller around the backend. Reserve action budget before each backend call, require a captured frame before clicks, and invalidate that frame after a mutation. A stale generation must fail before clicking. Keep a trace of successful actions and count attempted backend calls even when the backend returns an error.

## Why Rust

Rust makes ownership of the backend, file handles and action state explicit. Return `Result` for invalid inputs and system-call errors, then preserve the failure at the CLI boundary. The implementation uses the standard library and compiles with `rustc --edition 2021`; no package installation is required.

## Predict

Choose an accepted input and a rejected input before changing code. Write down the exact output or error you expect. Identify the first side effect and the checks that must run before it.

## Interactive lab

```figure
pj-desktop-control-3
```

Advance through the contract, state transition and observable result. An invalid input must stop before the transition. Explain which piece of state prevents the next action after a failure.

## Build

Implement `Controller.capture, Controller.click, Controller.type_text` in your workspace `main.rs`. Keep earlier stages working. Read the function signatures and tests first, then implement one boundary at a time. The fixture is a deterministic test backend, and its results do not establish native operating-system behavior.

A second click cannot reuse the pre-click screenshot. The caller must capture the changed scene first.

## Verify

```bash
python3 scripts/project_test.py desktop-control --init learning-artifacts/desktop-control
python3 scripts/project_test.py desktop-control --stage 3 --path learning-artifacts/desktop-control --strict
```

Initialize only once. The grader compiles tests against the learner path through `PROJECT_WORKSPACE`. Missing functions or intentional starter failures must fail; reference code is never imported as a fallback.

## What you see

A second click cannot reuse the pre-click screenshot. The caller must capture the changed scene first.

The stage suite covers ordinary input, boundary conditions and rejected behavior. After completing all stages, compile and run the actual program:

```bash
rustc --edition 2021 learning-artifacts/desktop-control/main.rs -o /tmp/desktop-control
/tmp/desktop-control --demo
```

## Ship it

Keep a fixture you wrote and a short explanation of one rejected action in your learner workspace. State whether you tested only the fixture or an optional native adapter. Preserve that distinction in any demonstration or scorecard.
