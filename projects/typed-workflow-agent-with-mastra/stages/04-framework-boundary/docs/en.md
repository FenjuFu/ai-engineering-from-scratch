# Compare the scratch runtime with Mastra

> A read ticket returns the same answer through the scratch runtime and a real Mastra workflow. An unapproved write reaches a failed framework state before invoking its tool.

**Type:** Build
**Languages:** TypeScript
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Build `optional-mastra/adapter.ts` in your learner workspace. Export `createTicketWorkflow(tool, approved = false)`, which returns a committed Mastra workflow supporting `createRun()` and `run.start({ inputData: ticket })`.

Define Zod input and output schemas for three steps: classify the ticket, construct its plan, and execute that plan. Compose the steps with `then` and `commit`. Reuse the scratch runtime through imports from `../main.ts`; a framework should not silently change your approval contract.

The adapter translates the scratch runtime's `complete` result into the workflow's successful output. It throws when the scratch runtime returns `suspended` or `failed`, so this comparison exposes a failed Mastra run for unapproved writes. It does not implement Mastra's own durable suspension and resume facility.

## Why this language

TypeScript carries the step contracts across the real `createStep` and `createWorkflow` APIs. Zod validates runtime data because Node's type stripping does not check types or validate external input. The optional packages are pinned to Mastra 1.71.0 and Zod 4.3.6.

## Predict

For `{ id: "T-1", message: "Find billing policy" }`, a tool returning `Refunds require a receipt.` should produce `{ ticketId: "T-1", answer: "Refunds require a receipt.", calls: 1 }`.

Predict the tool-call count for an empty ticket, an unapproved update, and a tool that always returns an empty string. The expected counts are zero, zero, and two. Explain why schema validation, approval, and bounded retries stop each run at a different boundary.

## Interactive lab

```figure
pj-typed-workflow-agent-with-mastra-4
```

Step through classify, plan, and execute. Follow the same ticket through the scratch runtime and framework adapter, then compare the business result and terminal state separately.

## Build

Keep the core `runTicket` and `executePlan` contracts passing. Implement the initialized adapter scaffold and supply the same injected tool to the execution step. Configure `maxCalls: 3` and `maxAttempts: 2`, and pass the factory's approval flag into `executePlan`.

The optional framework tests live outside the learner workspace in this stage's `tests-framework/` directory. They import `PROJECT_WORKSPACE/optional-mastra/adapter.ts` and `PROJECT_WORKSPACE/main.ts`. Editing a reference adapter or a learner-owned test cannot substitute for implementing your workspace.

## Verify

From the repository root, initialize once and run the offline core:

```bash
python3 scripts/project_test.py typed-workflow-agent-with-mastra --init learning-artifacts/typed-workflow-agent-with-mastra
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra --strict
```

Install the optional packages at the workspace root, where the grader probes them, then select the real framework runner:

```bash
npm install --prefix learning-artifacts/typed-workflow-agent-with-mastra --ignore-scripts --package-lock=false --save-exact @mastra/core@1.71.0 zod@4.3.6
python3 scripts/project_test.py typed-workflow-agent-with-mastra --path learning-artifacts/typed-workflow-agent-with-mastra --optional --strict
```

The tools are deterministic local functions; these tests make no provider calls. For a reference run, install at `projects/typed-workflow-agent-with-mastra/solution` and replace `--path ...` with `--solution`.

## What you see

The default run executes 24 core tests. The optional run adds five tests and reports 11 tests for stage 4, 29 in total. Those five cases cover read parity, invalid input, blocked writes, approved writes, and empty-output retry exhaustion.

A missing package prints `SKIP` and an installation hint. `--optional --strict` exits unsuccessfully for that result. Default completion evidence describes only the core; selecting the optional runner also requires it to pass. Reference runs never earn learner certificates.

## Ship it

Keep your adapter and scratch implementation together under `learning-artifacts/typed-workflow-agent-with-mastra/`. Record an input you invented, its business result, and the terminal status from each runtime. Identify the distinction between your explicit approval flag and a durable human-approval system before connecting a tool with real side effects.
