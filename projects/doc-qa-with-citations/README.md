# Document QA With Citations and LangChain

Build grounded document QA from explicit spans, then use LangChain only for its useful splitter and model interfaces.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-doc-qa-with-citations-1
```

## Start

```bash
python3 scripts/project_test.py doc-qa-with-citations --init my-doc-qa-with-citations
python3 scripts/project_test.py doc-qa-with-citations --stage 1 --path my-doc-qa-with-citations
```

1. **Load local documents with stable provenance**: The second overlapping chunk of abcdef starts at offset 3 when size=4 and overlap=1.
2. **Rank chunks with an inspectable keyword score**: A socket query selects the socket chunk, while an unknown term abstains.
3. **Accept only answers grounded in retrieved spans**: A model response containing words absent from its cited chunk is rejected.
4. **Use a framework splitter without losing offsets**: Framework chunks are converted to the same source-span contract used by the baseline.

## Reference demo

```bash
python3 projects/doc-qa-with-citations/solution/demo.py
python3 scripts/project_test.py doc-qa-with-citations --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.

## Optional framework integration

The baseline stages use only the standard library. The framework adapter is implemented and has a separate smoke test that uses the real installed SDK with a local fake model. It never contacts a cloud service.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r projects/doc-qa-with-citations/requirements-framework.txt
.venv/bin/python scripts/project_test.py doc-qa-with-citations --solution --optional --strict
.venv/bin/python projects/doc-qa-with-citations/solution/framework_demo.py
```

The integration was verified against `langchain-text-splitters==1.1.2`. The cloud-provider path, where present, remains opt-in and requires your own environment credentials; no cloud deployment is performed.

The default grader runs 20 framework-independent tests. `--optional` adds 5 tests that use the real SDK and a deterministic local model. A missing SDK is reported as SKIP with an install hint; `--optional --strict` fails when the dependency is missing. Passing only the default tests does not claim framework verification.
