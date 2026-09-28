"""Report precision coverage and source recall.

Lesson: projects/report-judge/stages/03-metrics/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
"""

from claims import parse_claims
from support import judge_claim


def score_report(text, evidence, expected_sources=(), facts=()):
    claims = parse_claims(text)
    verdicts = [judge_claim(c, evidence) for c in claims]
    precision = sum(v["supported"] for v in verdicts) / len(claims) if claims else 0.0
    used = {c for row in claims for c in row["cites"] if c in evidence}
    expected = set(expected_sources)
    recall = len(used & expected) / len(expected) if expected else 1.0
    covered = sum(
        any(all(term.lower() in row["text"].lower() for term in fact) for row in claims)
        for fact in facts
    )
    coverage = covered / len(facts) if facts else 1.0
    return {
        "precision": precision,
        "recall": recall,
        "coverage": coverage,
        "score": round(100 * (0.5 * precision + 0.25 * recall + 0.25 * coverage), 2),
        "verdicts": verdicts,
    }
