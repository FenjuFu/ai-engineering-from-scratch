# Self-Correcting Workflow Hooks

Turn repeated, sourced corrections into scoped rules, persist them atomically, and enforce only explicitly approved rules.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py workflow-hooks --init learning-artifacts/workflow-hooks
python3 scripts/project_test.py workflow-hooks --path learning-artifacts/workflow-hooks
cd projects/workflow-hooks/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Capture corrections with provenance](stages/01-corrections/docs/en.md)
2. [Count independent sessions](stages/02-consolidate/docs/en.md)
3. [Approve and select scoped rules](stages/03-policy/docs/en.md)
4. [Persist rules across sessions](stages/04-durability/docs/en.md)

## Primary sources

- [Node filesystem operations](https://nodejs.org/api/fs.html)
- [JSON data interchange](https://www.rfc-editor.org/rfc/rfc8259)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
