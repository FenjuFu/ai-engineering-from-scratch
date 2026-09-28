# LLM Gateway With Fallbacks

Build an HTTP gateway library with endpoint validation, response limits, retry classification and a total-attempt budget. Offline tests inject a real net/http transport interface, while applications can use the standard HTTP client for live endpoints.

Level 3. Four stages, about eight hours. Implementation: Go, standard library only.

## Stages

1. [Validate provider endpoints](stages/01-validate-provider-endpoints/docs/en.md)
2. [Classify failures without retrying everything](stages/02-classify-failures-without-retrying-everything/docs/en.md)
3. [Send one bounded HTTP request](stages/03-send-one-bounded-http-request/docs/en.md)
4. [Route with a total-attempt budget](stages/04-route-with-a-total-attempt-budget/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py llm-gateway-with-fallbacks --init /tmp/llm-gateway-with-fallbacks-work
python3 scripts/project_test.py llm-gateway-with-fallbacks --stage 1 --path /tmp/llm-gateway-with-fallbacks-work
python3 scripts/project_test.py llm-gateway-with-fallbacks --all --solution --strict
```

## Run the artifact

```bash
cd projects/llm-gateway-with-fallbacks/solution
go run .
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py llm-gateway-with-fallbacks --all --path /tmp/llm-gateway-with-fallbacks-work --strict --report /tmp/llm-gateway-with-fallbacks-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://pkg.go.dev/net/http). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
