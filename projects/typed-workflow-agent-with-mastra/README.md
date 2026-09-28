# Typed Workflow Agent with Mastra

Build a typed ticket workflow with runtime contracts, approval suspension and retry budgets, then run the same domain operations through a real optional Mastra adapter.

Build the four stages in order. The core runs without model credentials or package installation. Use Node 22.18+ and Python 3 for the grader.

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --init learning-artifacts/typed-workflow-agent-with-mastra
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra
(cd projects/typed-workflow-agent-with-mastra/solution && node main.ts --demo)
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Optional Mastra comparison

Initialization includes `optional-mastra/adapter.ts`, which starts with an explicit implementation failure. Build its `createTicketWorkflow(tool, approved = false)` factory after the scratch runtime works. The reference adapter uses actual Mastra workflow steps with injected local tools, so the comparison needs no API credentials.

From the repository root, install the pinned packages in your learner workspace and include the instructor-owned framework tests:

```bash
npm install --prefix learning-artifacts/typed-workflow-agent-with-mastra --ignore-scripts --package-lock=false --save-exact @mastra/core@1.71.0 zod@4.3.6
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra --optional --strict
```

The normal grader runs 24 core tests. `--optional` adds five tests from `stages/04-framework-boundary/tests-framework/`, which import the selected workspace's adapter and scratch runtime. The optional reference run passes 29 tests in total. Missing Mastra or Zod produces `SKIP` with an installation hint; `--strict` exits unsuccessfully. Default completion covers the core only. Optional failures or skips prevent completion when that runner is selected.

For a reference comparison, install the same versions with `--prefix projects/typed-workflow-agent-with-mastra/solution`, then run the grader with `--solution --optional --strict`. Reference runs never earn learner certificates. The preserved package in `solution/optional-mastra/` can also be used independently, but the grader checks dependencies at the selected workspace root.

## Stages

1. [Define runtime contracts for typed steps](stages/01-contracts/docs/en.md)
2. [Validate tool plans and approval requirements](stages/02-plan/docs/en.md)
3. [Suspend, resume and bound retries](stages/03-runtime/docs/en.md)
4. [Compare the scratch runtime with Mastra](stages/04-framework-boundary/docs/en.md)

## Primary sources

- [Mastra workflows overview](https://mastra.ai/docs/workflows/overview)
- [Mastra workflow steps](https://mastra.ai/reference/workflows/step)
- [TypeScript narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
