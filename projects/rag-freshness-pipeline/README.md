# RAG Freshness Pipeline

Build a content-addressed document index with deletion tracking, version checks, and freshness-aware retrieval.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-rag-freshness-pipeline-1
```

## Start

```bash
python3 scripts/project_test.py rag-freshness-pipeline --init my-rag-freshness-pipeline
python3 scripts/project_test.py rag-freshness-pipeline --stage 1 --path my-rag-freshness-pipeline
```

1. **Normalize documents and fingerprint content**: Canonically equivalent é encodings receive identical content hashes.
2. **Plan inserts updates deletions and refreshes**: A removed document appears in delete, so stale chunks cannot remain searchable.
3. **Persist an index with atomic replacement**: A stale writer is rejected and the last committed snapshot stays readable.
4. **Exclude expired evidence at query time**: An expired matching note is excluded even when its keyword score is perfect.

## Reference demo

```bash
python3 projects/rag-freshness-pipeline/solution/demo.py
python3 scripts/project_test.py rag-freshness-pipeline --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.
