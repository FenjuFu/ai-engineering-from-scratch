# Sandbox Policy Planner

Build a policy simulator for four isolation profiles, requirement matching and residual-risk reports. Profiles are modeled fixtures. This project does not start containers or virtual machines and does not provide operating-system isolation.

Level 4. Four stages, about eight hours. Implementation: Rust, standard library only.

## Stages

1. [Parse the capability request](stages/01-parse-the-capability-request/docs/en.md)
2. [Define modeled control profiles](stages/02-define-modeled-control-profiles/docs/en.md)
3. [Select the least costly sufficient profile](stages/03-select-the-least-costly-sufficient-profile/docs/en.md)
4. [Report residual assumptions](stages/04-report-residual-assumptions/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py sandbox-ladder --init /tmp/sandbox-ladder-work
python3 scripts/project_test.py sandbox-ladder --stage 1 --path /tmp/sandbox-ladder-work
python3 scripts/project_test.py sandbox-ladder --all --solution --strict
```

## Run the artifact

```bash
cd projects/sandbox-ladder/solution
python3 demo.py
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py sandbox-ladder --all --path /tmp/sandbox-ladder-work --strict --report /tmp/sandbox-ladder-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://docs.docker.com/engine/security/). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
