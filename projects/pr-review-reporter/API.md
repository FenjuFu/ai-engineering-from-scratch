# Public implementation contract

Use --diff - for stdin, --repo /path --base REF --head REF for a read-only Git diff, or --candidates recorded-findings.json to validate another reviewer's findings against the supplied patch.

Four lexical detectors are narrow review candidates, not an exploit verdict. Binary and combined diffs are outside scope. Quoted Git paths are decoded before validating traversal and anchoring. No remote PR comment is posted.

### diff_parser.py

```python
def decode_path(raw)
def parse(raw)
```

### main.ts

```typescript
export function parseDiff(raw: string): AddedLine[]
export function inspect(lines: AddedLine[]): Finding[]
export function verify( findings: Finding[], lines: AddedLine[], ):
export function merge(findings: Finding[]): Finding[]
export function escapeHTML(value: string): string
export function render(findings: Finding[], rejected = 0): string
```

Record and class interfaces are supplied in the starter. Methods deliberately throw until implemented.

The stage tests specify ordinary results and rejected inputs. Do not replace the learner imports with reference imports. The final stage also runs the supplied input driver against your cumulative implementation.
