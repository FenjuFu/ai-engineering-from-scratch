# Meeting Notes to Actions

Extract explicit owners and dates from meeting notes, preserve line citations, and flag incomplete commitments for human review.

Python 3.10 or newer. No external packages, API keys, or network calls are needed for the core project.

## Build it

```bash
python3 scripts/project_test.py meeting-notes-to-actions --init my-meeting-notes-to-actions
python3 scripts/project_test.py meeting-notes-to-actions --stage 1 --path my-meeting-notes-to-actions
python3 scripts/project_test.py meeting-notes-to-actions --all --solution --strict
cd projects/meeting-notes-to-actions/solution
python3 demo.py
```

The demo prints real JSON from the implementation on local fixtures. It does not call a model service or claim a production benchmark. Each stage teaches an independent contract and adds tests against your workspace.

## Stages

1. [Parse explicit action records with line provenance](stages/01-parse-lines/docs/en.md)
2. [Validate owners and calendar dates](stages/02-validate-commitments/docs/en.md)
3. [Deduplicate exact commitments without losing citations](stages/03-deduplicate-actions/docs/en.md)
4. [Publish an escaped HTML checklist and summary](stages/04-publish-checklist/docs/en.md)

## Primary reference

[Mechanism and API reference](https://docs.python.org/3/library/datetime.html). Original implementation and fixtures.
