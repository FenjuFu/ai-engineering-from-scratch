"""Split labeled cases without identity leakage.

Lesson: projects/self-improving-skill-loop/stages/01-dataset/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
"""

import hashlib


def split_cases(cases, holdout_fraction=0.25):
    if not 0 < holdout_fraction < 1:
        raise ValueError("fraction must lie inside zero and one")
    seen = set()
    result = {"development": [], "holdout": []}
    for case in cases:
        key = case.get("id")
        label = case.get("label")
        text = case.get("text")
        if not all(isinstance(x, str) and x for x in [key, label, text]):
            raise ValueError("id text and label required")
        if key in seen:
            raise ValueError("duplicate case id")
        seen.add(key)
        score = int(hashlib.sha256(key.encode()).hexdigest()[:8], 16) / 2**32
        result["holdout" if score < holdout_fraction else "development"].append(
            dict(case)
        )
    return result
