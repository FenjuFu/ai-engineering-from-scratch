# Public implementation contract

Replace Driver with an adapter that implements observe, act and capture. Run cli.ts --live only after serving the authored fixture and setting BROWSE_BIN.

Offline mode exercises fixture transitions and recorded pixels. Pixel greenness is a fixture-specific signal, not general visual understanding. The live CLI is limited to explicitly allowed loopback pages.

### pixels.py

```python
def inspect(data)
```

### main.ts

```typescript
export function parseObservation(raw: unknown): Observation
export function choose(observation: Observation, task: Task): Action
export function inspectPNG(file: string):
export async function runAgent(driver: Driver, task: Task, maxSteps = 5)
export function scoreRuns(statuses: string[])
```

Record and class interfaces are supplied in the starter. Methods deliberately throw until implemented.

The stage tests specify ordinary results and rejected inputs. Do not replace the learner imports with reference imports. The final stage also runs the supplied input driver against your cumulative implementation.
