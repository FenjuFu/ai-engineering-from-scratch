"""Persist an index with atomic replacement.

Lesson: projects/rag-freshness-pipeline/stages/03-snapshot/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
"""

import json
import os
from pathlib import Path
import tempfile
import threading

_LOCK = threading.Lock()


def read_snapshot(path):
    path = Path(path)
    return (
        json.loads(path.read_text())
        if path.exists()
        else {"version": 0, "documents": {}}
    )


def commit(path, documents, expected_version):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with _LOCK:
        current = read_snapshot(path)
        if current["version"] != expected_version:
            raise ValueError("stale index version")
        next_state = {"version": expected_version + 1, "documents": documents}
        payload = json.dumps(next_state, sort_keys=True)
        fd, name = tempfile.mkstemp(dir=path.parent, prefix=".index-")
        try:
            with os.fdopen(fd, "w") as f:
                f.write(payload)
                f.flush()
                os.fsync(f.fileno())
            os.replace(name, path)
        finally:
            if os.path.exists(name):
                os.unlink(name)
    return next_state
