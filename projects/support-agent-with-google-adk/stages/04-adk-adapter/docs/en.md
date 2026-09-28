# Run two actual ADK agents with a session handoff

> The real ADK run emits triage and specialist events, with route and response in session state.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Implement `adk_adapter.py`: `collect_events`. This artifact is stage 4 of Support Agent With Google ADK. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-support-agent-with-google-adk-4
```

## Follow the mechanism

Use ADK where a framework earns its place: a Workflow graph with a sequential edge propagates an output key through session state. Two real LlmAgent instances use injected BaseLlm implementations that yield deterministic replies. Tests inspect both event authors and final session state; they do not mock the ADK runner or claim live model quality.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def collect_events(events):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py support-agent-with-google-adk --init my-support-agent-with-google-adk
python3 scripts/project_test.py support-agent-with-google-adk --stage 4 --path my-support-agent-with-google-adk
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The real ADK run emits triage and specialist events, with route and response in session state. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/support-agent-with-google-adk/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://google.github.io/adk-docs/agents/multi-agents/)

The adapter uses the current ADK `Workflow` graph API rather than the deprecated sequential wrapper. The specialist instruction contains the route produced by triage; its captured model request is checked by the real-SDK test.

## Verify the actual framework

The five default stage tests check the adapter contract without importing the SDK. Install the pinned optional dependency, then include the five real-SDK tests explicitly:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/support-agent-with-google-adk/requirements-framework.txt
.venv/bin/python scripts/project_test.py support-agent-with-google-adk --solution --optional --strict
.venv/bin/python projects/support-agent-with-google-adk/solution/framework_demo.py
```

Use `--path my-support-agent-with-google-adk` instead of `--solution` to grade your implementation. Missing dependencies produce a skip in optional mode and a failure in strict optional mode. The verified SDK version is `google-adk==2.10.0`; all model replies are local fixtures.
