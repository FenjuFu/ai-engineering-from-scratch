# Drive the actual Strands loop with a local model

> The framework produces one recorded JSON plan in one model call, then the independent validator checks it.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Implement `strands_adapter.py`: `parse_model_plan`, `run_strands`, `bedrock_agent`. This artifact is stage 4 of Cloud Agent With AWS Strands. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-cloud-agent-with-aws-strands-4
```

## Follow the mechanism

The real Strands Agent consumes streaming events from an injected Model subclass. This exercises the framework loop without credentials or cloud calls. The model still only proposes a plan; parse and scope-check its result with the earlier validator. A separate Bedrock constructor is explicit and is not invoked by offline demos or tests.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def parse_model_plan(text,scope):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py cloud-agent-with-aws-strands --init my-cloud-agent-with-aws-strands
python3 scripts/project_test.py cloud-agent-with-aws-strands --stage 4 --path my-cloud-agent-with-aws-strands
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The framework produces one recorded JSON plan in one model call, then the independent validator checks it. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/cloud-agent-with-aws-strands/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://strandsagents.com/docs/user-guide/concepts/model-providers/custom_model_provider/)

## Verify the actual framework

The five default stage tests check the adapter contract without importing the SDK. Install the pinned optional dependency, then include the five real-SDK tests explicitly:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/cloud-agent-with-aws-strands/requirements-framework.txt
.venv/bin/python scripts/project_test.py cloud-agent-with-aws-strands --solution --optional --strict
.venv/bin/python projects/cloud-agent-with-aws-strands/solution/framework_demo.py
```

Use `--path my-cloud-agent-with-aws-strands` instead of `--solution` to grade your implementation. Missing dependencies produce a skip in optional mode and a failure in strict optional mode. The verified SDK version is `strands-agents==1.57.1`; all model replies are local fixtures.
