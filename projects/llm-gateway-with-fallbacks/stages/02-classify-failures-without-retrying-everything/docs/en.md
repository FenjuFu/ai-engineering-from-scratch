# Classify failures without retrying everything

> 503 -> retry; 401 -> terminal

**Type:** Build
**Languages:** Go
**Stage:** 2 of 4
**Time:** ~2 hours

## What you build

Route a bounded request through providers with explicit failure semantics. This stage implements `ClassifyStatus` in `stage2.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

A success is exactly an HTTP 2xx response. Retry only rate limits and server errors; client authentication and request errors terminate. Validate status codes so missing or malformed fixture data is not treated as success.

## Work through one case

503 -> retry; 401 -> terminal. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-llm-gateway-with-fallbacks-2
```

## Your task

```go
func ClassifyStatus(status int)(string,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py llm-gateway-with-fallbacks --stage 2 --path /tmp/llm-gateway-with-fallbacks-work
```

The stage checks Success, RateLimit, Server, Auth, Invalid. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://pkg.go.dev/net/http). Build an HTTP gateway library with endpoint validation, response limits, retry classification and a total-attempt budget. Offline tests inject a real net/http transport interface, while applications can use the standard HTTP client for live endpoints.
