# Semantic Notes Search

Search local notes with explicit synonym expansion and normalized TF-IDF scores. Explain every match rather than hiding retrieval in a hosted embedding service.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py semantic-notes-search --init my-semantic-notes-search
python3 scripts/project_test.py semantic-notes-search --stage 1 --path my-semantic-notes-search
python3 scripts/project_test.py semantic-notes-search --all --solution --strict
cd projects/semantic-notes-search/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Normalize notes without losing identity](stages/01-normalize-notes/docs/en.md)
2. [Weight terms by document rarity](stages/02-weight-the-index/docs/en.md)
3. [Rank queries with a stable tie rule](stages/03-rank-queries/docs/en.md)
4. [Measure retrieval before adding embeddings](stages/04-measure-recall/docs/en.md)

## Primary reference

[Mechanism and API reference](https://nlp.stanford.edu/IR-book/html/htmledition/the-vector-space-model-for-scoring-1.html). Original implementation and fixtures.
