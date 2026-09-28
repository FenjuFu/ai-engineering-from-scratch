# Propose rules from development errors only

> A repeated refund token proposes billing; a token shared by two labels is rejected.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `propose.py`: `propose`. This artifact is stage 3 of Self-Improving Skill Loop. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-self-improving-skill-loop-3
```

## Follow the mechanism

Generate candidates only from mistakes in the development split. A token needs repeated support and an unambiguous label; this stops one-off names and contradictory examples from immediately becoming policy. Candidate generation never receives holdout cases. It proposes a change rather than publishing one.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def propose(development,rules,min_support=2):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py self-improving-skill-loop --init my-self-improving-skill-loop
python3 scripts/project_test.py self-improving-skill-loop --stage 3 --path my-self-improving-skill-loop
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A repeated refund token proposes billing; a token shared by two labels is rejected. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/self-improving-skill-loop/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.python.org/3/library/hashlib.html)
