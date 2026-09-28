# Use a framework splitter without losing offsets

> Framework chunks are converted to the same source-span contract used by the baseline.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Implement `adapter.py`: `adapt_splits`, `framework_qa`. This artifact is stage 4 of Document QA With Citations and LangChain. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-doc-qa-with-citations-4
```

## Follow the mechanism

The adapter keeps the from-scratch retrieval and answer validator. The optional LangChain path contributes recursive splitting and a fake model interface, then converts every chunk back to exact source offsets. If a splitter rewrites text, reject it instead of inventing provenance. Repeated overlapping substrings must advance the search cursor by one position, not by the full chunk length.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def adapt_splits(doc,parts):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py doc-qa-with-citations --init my-doc-qa-with-citations
python3 scripts/project_test.py doc-qa-with-citations --stage 4 --path my-doc-qa-with-citations
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

Framework chunks are converted to the same source-span contract used by the baseline. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/doc-qa-with-citations/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)

## Verify the actual framework

The five default stage tests check the adapter contract without importing the SDK. Install the pinned optional dependency, then include the five real-SDK tests explicitly:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/doc-qa-with-citations/requirements-framework.txt
.venv/bin/python scripts/project_test.py doc-qa-with-citations --solution --optional --strict
.venv/bin/python projects/doc-qa-with-citations/solution/framework_demo.py
```

Use `--path my-doc-qa-with-citations` instead of `--solution` to grade your implementation. Missing dependencies produce a skip in optional mode and a failure in strict optional mode. The verified SDK version is `langchain-text-splitters==1.1.2`; all model replies are local fixtures.
