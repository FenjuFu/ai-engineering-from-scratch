# Drive the real fixture and score the run

> Serve fixture.html over loopback and navigate to it with gstack browse. GstackDriver reads DOM observations, fills labels, clicks the observed button and captures a real screenshot. Commands use argument arrays instead of a shell. Run the same bounded policy with --live and compare its trace with the fixture backend. Keep completion scores separate for simulated and real-browser runs.

**Type:** Build
**Languages:** TypeScript, Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Serve fixture.html over loopback and navigate to it with gstack browse. GstackDriver reads DOM observations, fills labels, clicks the observed button and captures a real screenshot. Commands use argument arrays instead of a shell. Run the same bounded policy with --live and compare its trace with the fixture backend. Keep completion scores separate for simulated and real-browser runs.

The boundary for this stage is `GstackDriver, scoreRuns`. Keep earlier stage behavior intact: the final grader runs every stage against the same workspace.

## Why this language

Node child-process argv calls adapt the same driver contract to the installed gstack browser. Node 22.18 or newer executes the erasable TypeScript syntax directly. Runtime checks remain necessary because Node strips types without checking them.

## Predict

Before coding, write down the successful output and one failure case. Use the last test in this stage as your adversarial example. Explain which invariant should reject that input and why the failure must happen before a side effect.

## Interactive lab

```figure
pj-browser-agent-4
```

Step through the boundary checks. Change one assumption in your notebook, then predict whether the next step is reachable. The diagram describes control flow; your tests establish its behavior.

## Build

Implement `GstackDriver, scoreRuns` in your workspace `main.ts`. Read the exported types in the reference only after attempting the contract. Preserve the starter's public names so tests can call your implementation. Return structured values instead of printing inside the core function; the CLI prints the final result.

Start `python3 -m http.server 8877 --bind 127.0.0.1 --directory projects/browser-agent/solution`, navigate with `$BROWSE_BIN goto http://127.0.0.1:8877/fixture.html`, then run `node projects/browser-agent/solution/main.ts --live`. The run saves browser-result.png and reports actual Chromium mode.

## Verify

```bash
python3 scripts/project_test.py browser-agent --init learning-artifacts/browser-agent
python3 scripts/project_test.py browser-agent --stage 4 --path learning-artifacts/browser-agent
```

Run `--init` only once. Tests import `PROJECT_WORKSPACE/main.ts`, so editing the reference solution cannot make your learner workspace pass. A missing implementation must fail. After all stages, run the complete suite and demo:

```bash
python3 scripts/project_test.py browser-agent --path learning-artifacts/browser-agent
node learning-artifacts/browser-agent/main.ts --demo
```

## What you see

Start `python3 -m http.server 8877 --bind 127.0.0.1 --directory projects/browser-agent/solution`, navigate with `$BROWSE_BIN goto http://127.0.0.1:8877/fixture.html`, then run `node projects/browser-agent/solution/main.ts --live`. The run saves browser-result.png and reports actual Chromium mode.

Passing cases cover ordinary inputs and boundary failures. Record the observed return value, exception, or output file in your notebook. If a test fails, reduce it to the smallest input before changing the algorithm.

## Ship it

Keep your implementation and one input you invented under `learning-artifacts/browser-agent/`. Add a short explanation of a rejected input and the limitation you would remove next. The reference is a local educational implementation, not a claim of production completeness.
