# Decode and validate PCM WAV samples

> The bytes encoding [0, 0.5, -0.5] decode to those exact normalized values.

**Type:** Build
**Languages:** Python
**Stage:** 1 of 4
**Time:** ~2 hours

## What you build

Implement `pcm.py`: `decode_wav`, `encode_wav`. This artifact is stage 1 of Voice Note Transcriber Pipeline. It consumes explicit inputs and returns an inspectable result that the next stage can use.

```figure
pj-voice-note-transcriber-pipeline-1
```

## Follow the mechanism

Read the WAV header before interpreting samples. This stage accepts mono, little-endian signed 16-bit PCM only and normalizes samples to roughly [-1, 1]. A timestamp later means sample_index / sample_rate; guessing the sample rate silently shifts every transcript boundary.

## Build it

Read the starter signatures and the tests before implementing the transformation. Keep validation at the input boundary, make output order deterministic, and preserve the distinction between empty input and invalid input. Use the preceding stages where the imports name them; avoid duplicating their logic.

```python
def decode_wav(data):
    raise NotImplementedError("Implement the stage contract")
```

The five tests exercise successful results and failure boundaries. Explain why each failing input should be rejected before changing its assertion. An implementation that returns a canned demo result cannot satisfy the varied inputs.

## Run it

```bash
python3 scripts/project_test.py voice-note-transcriber-pipeline --init my-voice-note-transcriber-pipeline
python3 scripts/project_test.py voice-note-transcriber-pipeline --stage 1 --path my-voice-note-transcriber-pipeline
```

Initialize once. Later stages accumulate their source files in the same workspace and rerun the earlier tests.

## What you should see

The bytes encoding [0, 0.5, -0.5] decode to those exact normalized values. This stage has five deterministic tests. A fresh workspace reports a clear implementation failure; the reference solution passes this stage and all preceding stages.

## Inspect the boundary

Predict what happens for empty input and for an input that violates the stage contract. Which result would be unsafe to pass to the next stage? Which information would be lost if the stage returned only a boolean?

## Use it

After all stages pass, run `python3 projects/voice-note-transcriber-pipeline/solution/demo.py` for an offline reference demonstration. To run your own modules, copy that small driver into your workspace and keep its imports pointed at your implementations.

## Primary references

- [Reference 1](https://docs.python.org/3/library/wave.html)
- [Reference 2](https://www.w3.org/TR/webvtt1/)
