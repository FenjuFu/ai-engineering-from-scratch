# Local Model Evaluation Harness

Evaluate recorded local-model responses with exact-answer accuracy, calibration error, and latency percentiles. Keep model execution separate from measurement.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py local-model-eval-harness --init my-local-model-eval-harness
python3 scripts/project_test.py local-model-eval-harness --stage 1 --path my-local-model-eval-harness
python3 scripts/project_test.py local-model-eval-harness --all --solution --strict
cd projects/local-model-eval-harness/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Validate prediction records](stages/01-validate-predictions/docs/en.md)
2. [Measure normalized exact-answer accuracy](stages/02-measure-accuracy/docs/en.md)
3. [Measure confidence calibration](stages/03-measure-calibration/docs/en.md)
4. [Publish accuracy and latency together](stages/04-publish-scorecard/docs/en.md)

## Primary reference

[Mechanism and API reference](https://docs.python.org/3/library/statistics.html). Original implementation and fixtures.
