# SKILL.md Validator and Loader

Build a bounded Agent Skills loader with a deliberately small frontmatter grammar, strict metadata validation, safe reference paths, and progressive disclosure. The supported YAML subset is explicit; unsupported forms fail instead of being guessed.

Level 1. Four stages, about eight hours. Implementation: Rust, standard library only.

## Stages

1. [Parse an explicit frontmatter subset](stages/01-parse-an-explicit-frontmatter-subset/docs/en.md)
2. [Validate names and descriptions](stages/02-validate-names-and-descriptions/docs/en.md)
3. [Contain resource paths](stages/03-contain-resource-paths/docs/en.md)
4. [Load context within a character budget](stages/04-load-context-within-a-character-budget/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py skill-validator --init /tmp/skill-validator-work
python3 scripts/project_test.py skill-validator --stage 1 --path /tmp/skill-validator-work
python3 scripts/project_test.py skill-validator --all --solution --strict
```

## Run the artifact

```bash
cd projects/skill-validator/solution
python3 demo.py
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py skill-validator --all --path /tmp/skill-validator-work --strict --report /tmp/skill-validator-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://agentskills.io/specification). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
