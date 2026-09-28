import json
from main import *

print(
    json.dumps(
        compare_systems(
            {
                "baseline": {"deploy": ["b", "c", "a"]},
                "candidate": {"deploy": ["a", "b", "c"]},
            },
            {"deploy": {"a": 3, "b": 1, "c": 0}},
            3,
        ),
        indent=2,
    )
)
