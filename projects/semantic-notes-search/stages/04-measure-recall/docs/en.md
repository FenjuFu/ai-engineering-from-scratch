# Measure retrieval before adding embeddings

> Evaluate labeled query-to-id cases and report hits, total, and recall.

**Type:** Build
**Languages:** Python
**Stage:** 4 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `evaluate` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

A retrieval demo needs a score tied to a task. For each labeled query, measure whether the expected document appears in the first k results. Average these independent hits for recall at k.

This tiny labeled fixture is public and deterministic. A perfect score here cannot establish quality on new notes. Keep a separate set of your own paraphrases before deciding whether synonym expansion is sufficient.

```figure
pj-semantic-notes-search-4
```

## Predict first

Can adding a synonym improve one query while hurting another through a tie?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `evaluate` in `main.py` in your learner workspace. Evaluate labeled query-to-id cases and report hits, total, and recall. Reject labels that reference missing notes.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py semantic-notes-search --init my-semantic-notes-search
python3 scripts/project_test.py semantic-notes-search --stage 4 --path my-semantic-notes-search
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The included deployment and backup questions produce a JSON report with scores and a recall metric.

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
