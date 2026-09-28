# Desktop Control Backend

Implement a Rust desktop backend trait, validated screenshot coordinates, stale-frame rejection and a fixture scene, with an explicitly opt-in macOS adapter.

Rust standard library only. Python 3 is used solely by the portable demo compiler wrapper. No provider credentials are required.

```bash
python3 scripts/project_test.py desktop-control --init learning-artifacts/desktop-control
python3 scripts/project_test.py desktop-control --all --path learning-artifacts/desktop-control --strict
cd projects/desktop-control/solution
python3 demo.py
```

## Build route

1. [Validate frames and coordinate spaces](stages/01-frame-contract/docs/en.md)
2. [Render and manipulate a fixture scene](stages/02-backend-trait/docs/en.md)
3. [Reject stale observations and exhausted budgets](stages/03-controller/docs/en.md)
4. [Build an opt-in native boundary](stages/04-native-adapter/docs/en.md)

## Official references

- [Rust process commands](https://doc.rust-lang.org/std/process/struct.Command.html)
- [AppleScript language guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/)
- [PNG specification](https://www.w3.org/TR/png-3/)

The code and fixtures are original. Default runs use the explicitly named fixture backend. Native adapters are opt-in and are not covered by fixture tests.
