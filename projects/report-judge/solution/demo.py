import json
from metrics import score_report
from compare import compare

print(
    json.dumps(
        score_report(
            "Each guest owns a kernel [S1].",
            {"S1": "Each guest owns a kernel."},
            ["S1"],
            [["kernel"]],
        ),
        indent=2,
    )
)
print(json.dumps(compare({"q1": 70, "q2": 80}, {"q1": 75, "q2": 85}), indent=2))
