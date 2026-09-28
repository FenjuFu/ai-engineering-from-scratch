# Parse claims and citation references

> One [S1]. Two [S2]. becomes two independently auditable claims.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Implement `claims.py`: `parse_claims`. This artifact is stage 1 of Report Judge. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-report-judge-1
```

## Follow the mechanism

A citation parser identifies references without deciding whether they are true. Deduplicate markers within each sentence, preserve the claim text, and ignore markdown headings. This deliberately narrow grammar handles one paragraph per line; it does not pretend to parse arbitrary markdown or abbreviations.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def parse_claims(text):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py report-judge --init my-report-judge
python3 scripts/project_test.py report-judge --stage 1 --path my-report-judge
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

One [S1]. Two [S2]. becomes two independently auditable claims. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/report-judge/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://www.rfc-editor.org/rfc/rfc8259)
