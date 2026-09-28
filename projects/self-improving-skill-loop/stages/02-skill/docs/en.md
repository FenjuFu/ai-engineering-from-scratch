# Execute and score a transparent routing skill

> The rule [reset, password] matches reset password but does not match reset only.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Implement `skill.py`: `route`, `evaluate`. This artifact is stage 2 of Self-Improving Skill Loop. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-self-improving-skill-loop-2
```

## Follow the mechanism

A routing skill is an ordered list of conjunctions. Matching every term makes multiword rules more specific than a bag of independent keywords, and first-match order is part of the contract. Evaluation stores predicted and expected labels per case so an aggregate cannot hide who regressed.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def route(text,rules,default='unknown'):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py self-improving-skill-loop --init my-self-improving-skill-loop
python3 scripts/project_test.py self-improving-skill-loop --stage 2 --path my-self-improving-skill-loop
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The rule [reset, password] matches reset password but does not match reset only. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/self-improving-skill-loop/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.python.org/3/library/hashlib.html)
