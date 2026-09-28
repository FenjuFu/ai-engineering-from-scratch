# Durable Agent Jobs

Build a local job ledger with explicit transitions, versioned claims, lease expiry and atomic snapshot files. The store assumes one process owns the ledger; production multi-process coordination needs a transactional database or lock service.

Level 4. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Create jobs with stable identity](stages/01-create-jobs-with-stable-identity/docs/en.md)
2. [Claim with a lease and version](stages/02-claim-with-a-lease-and-version/docs/en.md)
3. [Finish or reclaim expired work](stages/03-finish-or-reclaim-expired-work/docs/en.md)
4. [Write and recover atomic snapshots](stages/04-write-and-recover-atomic-snapshots/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py durable-agent-jobs --init /tmp/durable-agent-jobs-work
python3 scripts/project_test.py durable-agent-jobs --stage 1 --path /tmp/durable-agent-jobs-work
python3 scripts/project_test.py durable-agent-jobs --all --solution --strict
```

## Run the artifact

```bash
cd projects/durable-agent-jobs/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py durable-agent-jobs --all --path /tmp/durable-agent-jobs-work --strict --report /tmp/durable-agent-jobs-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://pkg.go.dev/os#Rename). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
