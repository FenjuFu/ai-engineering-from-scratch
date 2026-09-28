# Harness Bench

Build a deterministic evaluation harness with strict case ingestion, normalized exact-match scoring, per-run accounting and stable leaderboard output. The reference model is a local fixture function; benchmark numbers describe these cases, not general model capability.

Level 5. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Load unseen benchmark cases](stages/01-load-unseen-benchmark-cases/docs/en.md)
2. [Define exactly what a correct answer means](stages/02-define-exactly-what-a-correct-answer-means/docs/en.md)
3. [Run a harness under a call budget](stages/03-run-a-harness-under-a-call-budget/docs/en.md)
4. [Compare runs on equal denominators](stages/04-compare-runs-on-equal-denominators/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py harness-bench --init /tmp/harness-bench-work
python3 scripts/project_test.py harness-bench --stage 1 --path /tmp/harness-bench-work
python3 scripts/project_test.py harness-bench --all --solution --strict
```

## Run the artifact

```bash
cd projects/harness-bench/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py harness-bench --all --path /tmp/harness-bench-work --strict --report /tmp/harness-bench-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://pkg.go.dev/testing). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
