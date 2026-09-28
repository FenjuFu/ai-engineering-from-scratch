# Call an injected transcriber with bounded retries

> A provider timeout followed by success records attempts=2 and the segment audio hash.

**Type:** Build
**Languages:** Python
**Stage:** 3 of 4
**Time:** ~2 hours

## What you build

Implement `transcribe.py`: `transcribe`. This artifact is stage 3 of Voice Note Transcriber Pipeline. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-voice-note-transcriber-pipeline-3
```

## Follow the mechanism

The pipeline sends real audio bytes to a provider function. Tests inject a deterministic transcript and label it as a fixture; no speech recognition is claimed. Retry only transient timeouts and retain an audio hash so a response can be tied back to the exact segment that produced it.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def transcribe(samples,rate,spans,provider,retries=1):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py voice-note-transcriber-pipeline --init my-voice-note-transcriber-pipeline
python3 scripts/project_test.py voice-note-transcriber-pipeline --stage 3 --path my-voice-note-transcriber-pipeline
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

A provider timeout followed by success records attempts=2 and the segment audio hash. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/voice-note-transcriber-pipeline/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.python.org/3/library/wave.html)
- [Reference 2](https://www.w3.org/TR/webvtt1/)
