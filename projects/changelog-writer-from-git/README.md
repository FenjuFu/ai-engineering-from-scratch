# Changelog Writer From Git

Build a parser for a bounded Git export, conventional-commit classification, deterministic grouping and Markdown release notes. Demo input is recorded locally, and a separate export command can read a real repository without modifying it.

Level 2. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Read an immutable Git export](stages/01-read-an-immutable-git-export/docs/en.md)
2. [Classify conventional subjects](stages/02-classify-conventional-subjects/docs/en.md)
3. [Group commits with stable ordering](stages/03-group-commits-with-stable-ordering/docs/en.md)
4. [Render bounded release notes](stages/04-render-bounded-release-notes/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py changelog-writer-from-git --init /tmp/changelog-writer-from-git-work
python3 scripts/project_test.py changelog-writer-from-git --stage 1 --path /tmp/changelog-writer-from-git-work
python3 scripts/project_test.py changelog-writer-from-git --all --solution --strict
```

## Run the artifact

```bash
cd projects/changelog-writer-from-git/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py changelog-writer-from-git --all --path /tmp/changelog-writer-from-git-work --strict --report /tmp/changelog-writer-from-git-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://git-scm.com/docs/pretty-formats). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
