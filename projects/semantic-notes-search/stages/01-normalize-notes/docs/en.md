# Normalize notes without losing identity

> Return canonical Unicode word tokens.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `normalize` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A search index is a contract between the note you wrote and the query you will type later. Tokenize Unicode words with case folding, but keep each original document id. Repeated terms carry frequency information; a set would destroy it.

Use a small explicit synonym map to map deploy and release to the same canonical term. This demonstrates controlled semantic expansion. It is not an embedding model and cannot infer arbitrary paraphrases.

```figure
pj-semantic-notes-search-1
```

## Predict first

If release maps to deploy and deploy maps to release, should one token expand forever?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `normalize` in `main.py` in your learner workspace. Return canonical Unicode word tokens. Expand aliases only once so a cycle in the alias table cannot loop.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py semantic-notes-search --init my-semantic-notes-search
python3 scripts/project_test.py semantic-notes-search --stage 1 --path my-semantic-notes-search
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

`normalize("Release CAFÉ", {"release":"deploy"})` returns `["deploy", "café"]`.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/semantic-notes-search/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://nlp.stanford.edu/IR-book/html/htmledition/the-vector-space-model-for-scoring-1.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
