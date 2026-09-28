# Cloud Agent With AWS Strands

Build a scoped read-only cloud plan and a bounded executor, then run the real Strands agent loop with a local fake model.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-cloud-agent-with-aws-strands-1
```

## Start

```bash
python3 scripts/project_test.py cloud-agent-with-aws-strands --init my-cloud-agent-with-aws-strands
python3 scripts/project_test.py cloud-agent-with-aws-strands --stage 1 --path my-cloud-agent-with-aws-strands
```

1. **Validate a scoped cloud inspection plan**: A delete operation or an out-of-scope resource fails before any provider call.
2. **Execute reads within step and response budgets**: A zero-step budget performs no provider calls and returns budget_exhausted.
3. **Retry transient reads and reuse completed requests**: A transient timeout retries, while a permission failure is propagated after one call.
4. **Drive the actual Strands loop with a local model**: The framework produces one recorded JSON plan in one model call, then the independent validator checks it.

## Reference demo

```bash
python3 projects/cloud-agent-with-aws-strands/solution/demo.py
python3 scripts/project_test.py cloud-agent-with-aws-strands --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.

## Optional framework integration

The baseline stages use only the standard library. The framework adapter is implemented and has a separate smoke test that uses the real installed SDK with a local fake model. It never contacts a cloud service.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/cloud-agent-with-aws-strands/requirements-framework.txt
.venv/bin/python scripts/project_test.py cloud-agent-with-aws-strands --solution --optional --strict
.venv/bin/python projects/cloud-agent-with-aws-strands/solution/framework_demo.py
```

The integration was verified against `strands-agents==1.57.1`. The cloud-provider path, where present, remains opt-in and requires your own environment credentials; no cloud deployment is performed.

The default grader runs 20 framework-independent tests. `--optional` adds 5 tests that use the real SDK and a deterministic local model. A missing SDK is reported as SKIP with an install hint; `--optional --strict` fails when the dependency is missing. Passing only the default tests does not claim framework verification.
