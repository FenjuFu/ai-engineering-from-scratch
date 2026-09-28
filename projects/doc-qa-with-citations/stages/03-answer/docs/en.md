# Accept only answers grounded in retrieved spans

> A model response containing words absent from its cited chunk is rejected.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `answer.py`: `answer`. This artifact is stage 3 of Document QA With Citations and LangChain. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-doc-qa-with-citations-3
```

## Follow the mechanism

Ask the model to select an exact quote and a source id, then validate both. A quoted substring gives a checkable span; it does not guarantee the source is true. Empty retrieval returns an explicit abstention without calling the model. A later paraphrasing writer would need a different support gate.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def answer(question,chunks,model):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py doc-qa-with-citations --init my-doc-qa-with-citations
python3 scripts/project_test.py doc-qa-with-citations --stage 3 --path my-doc-qa-with-citations
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A model response containing words absent from its cited chunk is rejected. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/doc-qa-with-citations/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
