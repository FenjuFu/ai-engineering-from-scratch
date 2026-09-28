# Voice Note Transcriber Pipeline

Decode real PCM WAV bytes, segment activity by energy, and assemble timestamped transcripts through an injected transcription provider.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-voice-note-transcriber-pipeline-1
```

## Start

```bash
python3 scripts/project_test.py voice-note-transcriber-pipeline --init my-voice-note-transcriber-pipeline
python3 scripts/project_test.py voice-note-transcriber-pipeline --stage 1 --path my-voice-note-transcriber-pipeline
```

1. **Decode and validate PCM WAV samples**: The bytes encoding [0, 0.5, -0.5] decode to those exact normalized values.
2. **Segment speech candidates with RMS energy**: Two active 40 ms regions separated by 20 ms silence merge into one 100 ms region.
3. **Call an injected transcriber with bounded retries**: A provider timeout followed by success records attempts=2 and the segment audio hash.
4. **Export validated WebVTT captions**: A 1.234-second offset renders as 00:00:01.234, and malformed cue order is rejected.

## Reference demo

```bash
python3 projects/voice-note-transcriber-pipeline/solution/demo.py
python3 scripts/project_test.py voice-note-transcriber-pipeline --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.
