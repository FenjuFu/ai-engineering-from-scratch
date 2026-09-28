# Retrieval Evaluation Lab

Measure ranking quality with precision, recall, reciprocal rank, and discounted gain while exposing duplicates and missing judgments.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py retrieval-evaluation-lab --init my-retrieval-evaluation-lab
python3 scripts/project_test.py retrieval-evaluation-lab --stage 1 --path my-retrieval-evaluation-lab
python3 scripts/project_test.py retrieval-evaluation-lab --all --solution --strict
cd projects/retrieval-evaluation-lab/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Validate rankings and graded judgments](stages/01-validate-rankings/docs/en.md)
2. [Compute precision and recall at k](stages/02-precision-and-recall/docs/en.md)
3. [Reward useful evidence near the top](stages/03-rank-sensitive-metrics/docs/en.md)
4. [Compare systems query by query](stages/04-compare-systems/docs/en.md)

## Primary reference

[Mechanism and API reference](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html). Original implementation and fixtures.
