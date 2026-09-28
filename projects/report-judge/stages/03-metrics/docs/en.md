# Report precision coverage and source recall

> A report citing one of two expected sources has recall 0.5, even with perfect precision.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `metrics.py`: `score_report`. This artifact is stage 3 of Report Judge. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-report-judge-3
```

## Follow the mechanism

Keep metrics separate before combining them. Precision measures published support, source recall measures expected evidence selection, and fact coverage measures whether key phrases appear. An empty report has zero precision, preventing abstention from looking perfectly accurate.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def score_report(text,evidence,expected_sources=(),facts=()):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py report-judge --init my-report-judge
python3 scripts/project_test.py report-judge --stage 3 --path my-report-judge
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A report citing one of two expected sources has recall 0.5, even with perfect precision. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/report-judge/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://www.rfc-editor.org/rfc/rfc8259)
