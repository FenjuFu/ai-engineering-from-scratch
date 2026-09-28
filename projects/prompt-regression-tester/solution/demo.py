import json
from main import *

cases = [
    {"id": "a", "prompt": "Return JSON", "checks": [{"kind": "json"}]},
    {
        "id": "b",
        "prompt": "Include source",
        "checks": [{"kind": "contains", "value": "source:"}],
    },
]
report = compare(
    cases, {"a": "{}", "b": "uncited"}, {"a": "not json", "b": "source: notes.md"}
)
print(json.dumps({"comparison": report, "gate": release_gate(report)}, indent=2))
