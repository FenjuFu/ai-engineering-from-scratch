# Publish a deterministic incident packet

> validated claim + ordered evidence -> one complete packet

**Type:** Build
**Languages:** Go
**Stage:** 4 of 4
**Time:** ~2 hours

## What you build

Turn incident events into a timeline with evidence-backed claims. This stage implements `Report` in `stage4.go`. The finished behavior feeds the next stage through a typed contract.

## Why it matters

Render the validated timeline and claims with quoted message text and explicit references. Cap the number of claims before constructing the report. An invalid claim prevents publishing the entire packet, keeping partial success from looking like a completed postmortem.

## Work through one case

validated claim + ordered evidence -> one complete packet. Follow the figure one step at a time and predict the next state before advancing. Record which validation fails first and whether the caller-owned data should change.

```figure
pj-postmortem-writer-4
```

## Your task

```go
func Report(events []Event,claims []Claim,maxClaims int)(string,error)
```

Implement these public signatures in your workspace. Keep invalid input separate from a budget limit or state conflict. Preserve the original evidence or input record whenever an operation fails. Tests load your workspace directly, so implementing a different function in the checked-in solution does not advance your stage.

## Run the tests

```bash
python3 scripts/project_test.py postmortem-writer --stage 4 --path /tmp/postmortem-writer-work
```

The stage checks Packet, Limit, InvalidAtomic, Escaped, Deterministic. Use the failing case to locate the invariant you violated. Passing the normal example alone does not establish the boundary behavior.

## Check yourself

1. Which input reaches a different terminal state without changing the previous result?
2. What does this implementation prove, and which guarantee remains outside its stated scope?
3. Construct an unseen boundary case before reading the reference implementation.

## Going further

Change one declared limit, run the suite again, and explain which cases should change. Add an integration case that crosses this stage and the next without bypassing either validation boundary.

## Sources and scope

[Official reference](https://sre.google/workbook/postmortem-culture/). Build a deterministic incident report pipeline with strict event ingestion, stable ordering, source-bound claims and reproducible text output. Causal conclusions require supplied evidence and remain labeled as claims rather than inferred facts.
