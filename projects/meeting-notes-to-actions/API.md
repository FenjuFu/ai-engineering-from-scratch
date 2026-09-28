# Public implementation contract

Use the schema_version1 actions.json receipt with stable action ids and original source lines. CSV columns are id, owner, due and task, and contain approved actions only.

ACTION lines are authoritative candidates; NAME will TASK by YYYY-MM-DD is a conservative proposal grammar. Unstructured suggestions outside those grammars stay unassigned. HTML review does not post tasks or send messages.

### main.py

```python
def parse_notes(text)
def validate_action(action)
def deduplicate(actions)
def publish(actions, today)
```

The stage tests specify ordinary results and rejected inputs. Do not replace the learner imports with reference imports. The final stage also runs the supplied input driver against your cumulative implementation.
