# Weight terms by document rarity

> Build an index from a mapping of ids to strings.

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `build_index` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A word that appears in every note provides little discrimination. Compute smoothed IDF as log((1+N)/(1+df))+1, multiply by term frequency, then normalize each vector to unit length.

Store vectors and IDF together. A query must use the exact vocabulary and weights from the index; fitting query-specific IDF changes the coordinate system and invalidates cosine comparisons.

```figure
pj-semantic-notes-search-2
```

## Predict first

Which gets a larger weight: a word in one document or a word in every document?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `build_index` in `main.py` in your learner workspace. Build an index from a mapping of ids to strings. Empty notes have zero vectors and never cause division by zero.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py semantic-notes-search --init my-semantic-notes-search
python3 scripts/project_test.py semantic-notes-search --stage 2 --path my-semantic-notes-search
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

Every nonempty vector has squared length approximately 1. The empty index contains no vectors.

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
