# Reward useful evidence near the top

> Return reciprocal rank and NDCG at k.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~120 minutes

## Learning objectives

- Implement `rank_metrics` against the stated contract.
- Predict the boundary case before running the code.
- Keep earlier behavior intact when adding this stage.
- Explain which measured result is useful and which claim it cannot support.

## The mechanism

Reciprocal rank uses only the first relevant result. Normalized discounted cumulative gain uses every graded hit, with gain 2^grade-1 and discount log2(rank+1). Swapping a strong result downward should lower NDCG even when recall is unchanged.

The ideal ranking comes from all judgments sorted by grade, truncated to k. A zero ideal gain yields NDCG zero rather than division by zero.

```figure
pj-retrieval-evaluation-lab-3
```

## Predict first

Can two rankings have equal recall but different NDCG?

Write your prediction before opening the reference implementation. Trace a normal input and one empty or adversarial input by hand. The distinction is part of the interface, not an optional error message.

## Your task

Implement `rank_metrics` in `main.py` in your learner workspace. Return reciprocal rank and NDCG at k. Keep scores finite in [0,1].

Keep the data contract small enough to inspect. Reject malformed inputs before computing a score; a plausible number computed from invalid evidence is harder to debug than an explicit error.

## Run and inspect

From the repository root, initialize once, then run the cumulative grader:

```bash
python3 scripts/project_test.py retrieval-evaluation-lab --init my-retrieval-evaluation-lab
python3 scripts/project_test.py retrieval-evaluation-lab --stage 3 --path my-retrieval-evaluation-lab
```

The starter raises `NotImplementedError` until you supply the functions. Initialization keeps existing files, so you can repeat it safely. Do not add `--solution` while grading your own work.

## What you should see

The ideal ranking scores NDCG 1; reversing strong and weak evidence lowers it.

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
