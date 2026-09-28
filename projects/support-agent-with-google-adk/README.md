# Support Agent With Google ADK

Build ticket contracts, routing and handoff rules, then run real ADK specialist agents with deterministic local models.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-support-agent-with-google-adk-1
```

## Start

```bash
python3 scripts/project_test.py support-agent-with-google-adk --init my-support-agent-with-google-adk
python3 scripts/project_test.py support-agent-with-google-adk --stage 1 --path my-support-agent-with-google-adk
```

1. **Validate and redact support tickets**: The fixture replaces an email with [email] and an API-key value with [redacted].
2. **Route tickets and enforce specialist capabilities**: A refund/password tie goes to human, and billing cannot read an account.
3. **Record allowed handoff state transitions**: A received ticket becomes routed before it can become answered or escalated.
4. **Run two actual ADK agents with a session handoff**: The real ADK run emits triage and specialist events, with route and response in session state.

## Reference demo

```bash
python3 projects/support-agent-with-google-adk/solution/demo.py
python3 scripts/project_test.py support-agent-with-google-adk --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.

## Optional framework integration

The baseline stages use only the standard library. The framework adapter is implemented and has a separate smoke test that uses the real installed SDK with a local fake model. It never contacts a cloud service.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/support-agent-with-google-adk/requirements-framework.txt
.venv/bin/python scripts/project_test.py support-agent-with-google-adk --solution --optional --strict
.venv/bin/python projects/support-agent-with-google-adk/solution/framework_demo.py
```

The integration was verified against `google-adk==2.10.0`. The cloud-provider path, where present, remains opt-in and requires your own environment credentials; no cloud deployment is performed.

The default grader runs 20 framework-independent tests. `--optional` adds 5 tests that use the real SDK and a deterministic local model. A missing SDK is reported as SKIP with an install hint; `--optional --strict` fails when the dependency is missing. Passing only the default tests does not claim framework verification.
