# Load local documents with stable provenance

> The second overlapping chunk of abcdef starts at offset 3 when size=4 and overlap=1.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Implement `documents.py`: `load_documents`, `chunk_document`. This artifact is stage 1 of Document QA With Citations and LangChain. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-doc-qa-with-citations-1
```

## Follow the mechanism

Keep source identity, content hash and exact offsets before retrieving anything. Character windows are an intentionally simple baseline: overlap preserves context near boundaries but does not create new evidence. The loader refuses symlinks that escape its root, so a document scan cannot silently read another directory.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def load_documents(root):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py doc-qa-with-citations --init my-doc-qa-with-citations
python3 scripts/project_test.py doc-qa-with-citations --stage 1 --path my-doc-qa-with-citations
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The second overlapping chunk of abcdef starts at offset 3 when size=4 and overlap=1. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/doc-qa-with-citations/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
