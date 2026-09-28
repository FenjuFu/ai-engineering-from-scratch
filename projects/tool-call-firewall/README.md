# Tool Call Firewall

Build a deny-by-default policy evaluator with bounded arguments, role permissions, single-use approvals and a structured audit log. The artifact is a library gate; applications must place it before every real tool execution.

Level 4. Four stages, about eight hours. Implementation: Rust, standard library only.

## Stages

1. [Validate an unambiguous call envelope](stages/01-validate-an-unambiguous-call-envelope/docs/en.md)
2. [Evaluate role and path policy](stages/02-evaluate-role-and-path-policy/docs/en.md)
3. [Consume a request-bound approval once](stages/03-consume-a-request-bound-approval-once/docs/en.md)
4. [Record bounded audit evidence](stages/04-record-bounded-audit-evidence/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py tool-call-firewall --init /tmp/tool-call-firewall-work
python3 scripts/project_test.py tool-call-firewall --stage 1 --path /tmp/tool-call-firewall-work
python3 scripts/project_test.py tool-call-firewall --all --solution --strict
```

## Run the artifact

```bash
cd projects/tool-call-firewall/solution
python3 demo.py
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py tool-call-firewall --all --path /tmp/tool-call-firewall-work --strict --report /tmp/tool-call-firewall-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
