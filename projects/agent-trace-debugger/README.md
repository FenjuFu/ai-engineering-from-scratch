# Agent Trace Debugger

Validate nested agent spans, separate inclusive and exclusive time, identify expensive failures, and render a local trace timeline.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py agent-trace-debugger --init learning-artifacts/agent-trace-debugger
python3 scripts/project_test.py agent-trace-debugger --path learning-artifacts/agent-trace-debugger
cd projects/agent-trace-debugger/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Read a JSONL trace](stages/01-parse/docs/en.md)
2. [Validate parent relationships](stages/02-tree/docs/en.md)
3. [Separate work time from waiting time](stages/03-timing/docs/en.md)
4. [Render an inspectable timeline](stages/04-timeline/docs/en.md)

## Primary sources

- [OpenTelemetry traces concepts](https://opentelemetry.io/docs/concepts/signals/traces/)
- [Node test runner](https://nodejs.org/api/test.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
