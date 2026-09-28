import json
from main import *

index = build_index(
    {
        "deploy": "Deploy the service after tests pass.",
        "backup": "Back up the database every night.",
        "incident": "Service errors require an incident report.",
    },
    {"release": "deploy"},
)
print(
    json.dumps(
        {
            "query": "release service",
            "matches": search(index, "release service"),
            "evaluation": evaluate(
                index,
                [
                    {"query": "release", "expected": "deploy"},
                    {"query": "database", "expected": "backup"},
                ],
                1,
            ),
        },
        indent=2,
    )
)
