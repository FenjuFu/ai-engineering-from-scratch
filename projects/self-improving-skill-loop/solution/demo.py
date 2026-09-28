import json
from propose import propose
from promotion import gate

dev = [
    {"text": "refund order", "label": "billing"},
    {"text": "refund invoice", "label": "billing"},
]
candidate = propose(dev, [])
print(
    json.dumps(
        {
            "candidate": candidate,
            "gate": gate(
                [{"id": "eval-1", "text": "refund payment", "label": "billing"}],
                [],
                candidate,
            ),
        },
        indent=2,
    )
)
