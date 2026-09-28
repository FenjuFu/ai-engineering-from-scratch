# Skill Supply-Chain Scanner

Build an offline advisory scanner that preserves UTF-8 offsets, reports explicit policy patterns, scores distinct findings and emits a review gate. It is a transparent heuristic, not a malware detector or a promise that unflagged skills are safe.

Level 3. Four stages, about eight hours. Implementation: Rust, standard library only.

## Stages

1. [Retain byte-accurate source spans](stages/01-retain-byte-accurate-source-spans/docs/en.md)
2. [Detect named advisory patterns](stages/02-detect-named-advisory-patterns/docs/en.md)
3. [Score distinct evidence without inflation](stages/03-score-distinct-evidence-without-inflation/docs/en.md)
4. [Build an explicit review gate](stages/04-build-an-explicit-review-gate/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py skill-scanner --init /tmp/skill-scanner-work
python3 scripts/project_test.py skill-scanner --stage 1 --path /tmp/skill-scanner-work
python3 scripts/project_test.py skill-scanner --all --solution --strict
```

## Run the artifact

```bash
cd projects/skill-scanner/solution
python3 demo.py
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py skill-scanner --all --path /tmp/skill-scanner-work --strict --report /tmp/skill-scanner-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://agentskills.io/specification). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
