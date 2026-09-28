import json
from intake import ticket
from handoff import begin, transition

t = ticket({"id": "T-1", "text": "Please review this invoice"})
s = transition(begin(t), "classify", t["text"])
s = transition(s, "respond", "Review the invoice reference.")
print(json.dumps(s, indent=2))
