# Token Counter and Cost Meter

Build an explicit approximate tokenizer, exact recorded-usage accounting, rate-card cost calculation and budget admission. Estimates are labeled and never presented as provider tokenizer counts. Prices are fixture inputs rather than claims about current provider pricing.

Level 1. Four stages, about eight hours. Implementation: Rust, standard library only.

## Stages

1. [Estimate text with a documented bound](stages/01-estimate-text-with-a-documented-bound/docs/en.md)
2. [Validate recorded usage](stages/02-validate-recorded-usage/docs/en.md)
3. [Price with checked integers](stages/03-price-with-checked-integers/docs/en.md)
4. [Admit work against a ledger](stages/04-admit-work-against-a-ledger/docs/en.md)

## Build it

```bash
python3 scripts/project_test.py token-counter-and-cost-meter --init /tmp/token-counter-and-cost-meter-work
python3 scripts/project_test.py token-counter-and-cost-meter --stage 1 --path /tmp/token-counter-and-cost-meter-work
python3 scripts/project_test.py token-counter-and-cost-meter --all --solution --strict
```

## Run the artifact

```bash
cd projects/token-counter-and-cost-meter/solution
python3 demo.py
```

The demo exercises the real reference implementation with offline fixtures and terminates. Each stage has at least five distinct tests, including boundaries and rejected inputs. Expected behavior lives in the stage tests; the implementation never reads the held-out test files. The grader preserves your code during initialization and reports incomplete runs honestly when a runtime is missing.

## Completion evidence

```bash
python3 scripts/project_test.py token-counter-and-cost-meter --all --path /tmp/token-counter-and-cost-meter-work --strict --report /tmp/token-counter-and-cost-meter-result.json
```

Only a complete learner report can establish local completion. Reference runs do not grant a certificate. Reports are unsigned local evidence, and the project does not certify production readiness.

## Sources

[Official reference](https://doc.rust-lang.org/std/primitive.u64.html#method.checked_mul). All implementations and exercises are original. Fixture numbers are examples, not external benchmark claims or live service guarantees.
