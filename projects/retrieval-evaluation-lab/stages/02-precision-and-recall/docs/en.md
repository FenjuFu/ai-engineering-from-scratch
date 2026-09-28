# Compute precision and recall at k

> Compute binary precision and recall for positive-grade judgments at cutoff k..

**Type:** Build
**Languages:** Python
**Stage:** 2 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `precision_recall` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Precision answers how much of the displayed list was useful. Recall answers how much of all known relevant evidence was retrieved. These denominators are different.

Use k as the precision denominator, even when a system returns fewer than k results. This penalizes underfilled result lists consistently. Define empty-relevance recall as zero and report the judgment count.

```figure
pj-retrieval-evaluation-lab-2
```

## Predict first

What happens to recall when you add an unretrieved relevant judgment?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `precision_recall` in `main.py` in your learner workspace. Compute binary precision and recall for positive-grade judgments at cutoff k.

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py retrieval-evaluation-lab --init my-retrieval-evaluation-lab
python3 scripts/project_test.py retrieval-evaluation-lab --stage 2 --path my-retrieval-evaluation-lab
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

One hit at k=2 gives precision .5; two total relevant documents give recall .5.

The grader reports this stage as PASS only when its tests run successfully. To inspect the finished reference artifact separately:

```bash
cd projects/retrieval-evaluation-lab/solution
python3 demo.py
```

## Debug with evidence

Compare the failing assertion with the intermediate values shown in the figure. Check empty inputs, duplicate identifiers, and boundary values before changing the main algorithm. Never weaken the test to make the reference output pass.

## Check yourself

Which invariant does this stage preserve? Give one input that violates it and explain the resulting error. How would you detect a regression in an earlier stage?

## Going further

Use this artifact to inspect a real local dataset before connecting a model or an external service. Add a fixture from that use case, state the expected behavior first, and retain a separate evaluation set. Published fixtures are reviewable examples, not a secret benchmark.

## Sources

- [Primary technical reference](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html)

The code and examples in this project are original. The source explains the mechanism; no implementation is copied.
