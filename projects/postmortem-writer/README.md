# Incident Postmortem Writer

Build a deterministic incident report pipeline with strict event ingestion, stable ordering, source-bound claims and reproducible text output. Causal conclusions require supplied evidence and remain labeled as claims rather than inferred facts.

Level 2. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Parse an incident event ledger](stages/01-parse-an-incident-event-ledger/docs/en.md)
2. [Build a stable bounded timeline](stages/02-build-a-stable-bounded-timeline/docs/en.md)
3. [Require evidence for each claim](stages/03-require-evidence-for-each-claim/docs/en.md)
4. [Publish a deterministic incident packet](stages/04-publish-a-deterministic-incident-packet/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py postmortem-writer --init /tmp/postmortem-writer-work
python3 scripts/project_test.py postmortem-writer --stage 1 --path /tmp/postmortem-writer-work
python3 scripts/project_test.py postmortem-writer --all --solution --strict
```

## Run the artifact

```bash
cd projects/postmortem-writer/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py postmortem-writer --all --path /tmp/postmortem-writer-work --strict --report /tmp/postmortem-writer-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://sre.google/workbook/postmortem-culture/). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
