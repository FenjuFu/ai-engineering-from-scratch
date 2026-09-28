import json
from pcm import encode_wav, decode_wav
from activity import activity
from transcribe import transcribe
from captions import captions

audio = decode_wav(encode_wav([0] * 800 + [0.2] * 1600 + [0] * 800))
spans = activity(audio["samples"], audio["rate"])
rows = transcribe(
    audio["samples"],
    audio["rate"],
    spans,
    lambda wav: "Recorded fixture: review the deployment checklist.",
)
print("OFFLINE FIXTURE TRANSCRIBER; activity detection uses real PCM audio")
print(json.dumps(rows, indent=2))
print(captions(rows))
