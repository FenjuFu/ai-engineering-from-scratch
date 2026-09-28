import json
from fingerprint import normalize
from changes import diff
from retrieve import retrieve

plan = diff(
    {}, [{"id": "policy", "text": "Rotate service credentials", "updated": 100}]
)
print(json.dumps({k: v for k, v in plan.items() if k != "documents"}, indent=2))
print(json.dumps(retrieve(plan["documents"], "credentials", 120), indent=2))
