# Rank chunks with an inspectable keyword score

> A socket query selects the socket chunk, while an unknown term abstains.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Implement `retrieval.py`: `retrieve`. This artifact is stage 2 of Document QA With Citations and LangChain. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-doc-qa-with-citations-2
```

## Follow the mechanism

Term frequency saturates through a logarithm, and document frequency reduces the weight of common words. Return the whole chunk contract with its score, not just the text, because the next stage needs source offsets. This lexical baseline will miss synonyms; measure it before adding an embedding service.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def retrieve(chunks,query,k=3):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py doc-qa-with-citations --init my-doc-qa-with-citations
python3 scripts/project_test.py doc-qa-with-citations --stage 2 --path my-doc-qa-with-citations
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A socket query selects the socket chunk, while an unknown term abstains. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/doc-qa-with-citations/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
