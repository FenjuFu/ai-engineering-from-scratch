"""Export validated WebVTT captions.

Lesson: projects/voice-note-transcriber-pipeline/stages/04-captions/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
"""

import html


def stamp(seconds):
    if seconds < 0:
        raise ValueError("negative timestamp")
    ms = round(seconds * 1000)
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02}.{ms:03}"


def captions(rows):
    lines = ["WEBVTT", ""]
    last = 0.0
    for i, row in enumerate(rows, 1):
        if row["start"] < last or row["end"] <= row["start"]:
            raise ValueError("overlapping or invalid cue")
        text = html.escape(row["text"]).replace("\n", " ")
        lines.extend(
            [str(i), f"{stamp(row['start'])} --> {stamp(row['end'])}", text, ""]
        )
        last = row["end"]
    return "\n".join(lines)
