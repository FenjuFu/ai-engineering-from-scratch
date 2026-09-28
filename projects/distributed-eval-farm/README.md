# Distributed Eval Farm Coordinator

Build the coordinator logic behind an evaluation farm: deterministic partitions, fenced leases, idempotent results and a real bounded goroutine worker pool. The reference deployment runs in one process; network transport and cross-process storage are explicit extension points.

Level 5. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Partition stable case identities](stages/01-partition-stable-case-identities/docs/en.md)
2. [Fence each shard lease](stages/02-fence-each-shard-lease/docs/en.md)
3. [Accept idempotent completion receipts](stages/03-accept-idempotent-completion-receipts/docs/en.md)
4. [Run a bounded local worker pool](stages/04-run-a-bounded-local-worker-pool/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py distributed-eval-farm --init /tmp/distributed-eval-farm-work
python3 scripts/project_test.py distributed-eval-farm --stage 1 --path /tmp/distributed-eval-farm-work
python3 scripts/project_test.py distributed-eval-farm --all --solution --strict
```

## Run the artifact

```bash
cd projects/distributed-eval-farm/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py distributed-eval-farm --all --path /tmp/distributed-eval-farm-work --strict --report /tmp/distributed-eval-farm-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://go.dev/blog/pipelines). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
