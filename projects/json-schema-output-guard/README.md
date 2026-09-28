# JSON Schema Output Guard

Validate model output at the JSON boundary, return precise paths, and retry only under a bounded repair budget.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py json-schema-output-guard --init learning-artifacts/json-schema-output-guard
python3 scripts/project_test.py json-schema-output-guard --path learning-artifacts/json-schema-output-guard
cd projects/json-schema-output-guard/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Parse the untrusted boundary](stages/01-parse-json/docs/en.md)
2. [Walk a schema recursively](stages/02-validate-types/docs/en.md)
3. [Reject ambiguous and unsupported contracts](stages/03-constraints/docs/en.md)
4. [Repair with a finite budget](stages/04-bounded-repair/docs/en.md)

## Primary sources

- [JSON Schema validation vocabulary](https://json-schema.org/draft/2020-12/json-schema-validation)
- [Node TypeScript execution](https://nodejs.org/api/typescript.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
