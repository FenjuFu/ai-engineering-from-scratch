# Exclude expired evidence at query time

> An expired matching note is excluded even when its keyword score is perfect.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Implement `retrieve.py`: `retrieve`. This artifact is stage 4 of RAG Freshness Pipeline. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-rag-freshness-pipeline-4
```

## Follow the mechanism

Freshness is a query-time contract as well as an ingestion concern. A background job can fail, so every candidate must satisfy the age limit before ranking. Inject the clock instead of calling the system clock inside tests, and reject future timestamps rather than treating them as extra fresh.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def retrieve(documents,query,now,max_age=3600,k=3):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py rag-freshness-pipeline --init my-rag-freshness-pipeline
python3 scripts/project_test.py rag-freshness-pipeline --stage 4 --path my-rag-freshness-pipeline
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

An expired matching note is excluded even when its keyword score is perfect. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/rag-freshness-pipeline/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.python.org/3/library/os.html#os.replace)
