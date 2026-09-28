# Browser Agent

Build a bounded DOM agent, test it against adversarial observations, then verify a real local Chromium form with Python pixel evidence.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py browser-agent --init learning-artifacts/browser-agent
python3 scripts/project_test.py browser-agent --path learning-artifacts/browser-agent
cd projects/browser-agent/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Turn DOM state into constrained actions](stages/01-observations/docs/en.md)
2. [Stop on completion, stalling or budget](stages/02-bounded-loop/docs/en.md)
3. [Verify screenshot pixels in Python](stages/03-visual-proof/docs/en.md)
4. [Drive the real fixture and score the run](stages/04-real-browser/docs/en.md)

## Primary sources

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [PNG specification](https://www.w3.org/TR/png-3/)
- [HTML form controls](https://html.spec.whatwg.org/multipage/forms.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
