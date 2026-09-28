# Streaming Agent Shell in Rust

Build a real stdin/stdout Rust action loop with bounded reads, an explicit command grammar, path containment, and streamed JSON events.

Rust standard library only. Python 3 is used solely by the portable demo compiler wrapper. No provider credentials are required.

```bash
python3 scripts/project_test.py rust-agent-shell --init learning-artifacts/rust-agent-shell
python3 scripts/project_test.py rust-agent-shell --all --path learning-artifacts/rust-agent-shell --strict
cd projects/rust-agent-shell/solution
python3 demo.py
```

## Build route

1. [Parse a deliberately small action language](stages/01-grammar/docs/en.md)
2. [Confine file tools to a bounded root](stages/02-filesystem/docs/en.md)
3. [Track budgets and terminal state](stages/03-session/docs/en.md)
4. [Stream bounded JSON events through real stdin](stages/04-streaming/docs/en.md)

## Official references

- [Rust BufRead](https://doc.rust-lang.org/std/io/trait.BufRead.html)
- [Rust filesystem paths](https://doc.rust-lang.org/std/path/struct.Path.html)
- [JSON data interchange](https://www.rfc-editor.org/rfc/rfc8259)

The code and fixtures are original. The demo creates a temporary workspace and runs the same action loop as interactive stdin mode. File tools use application-level path checks; this is not an operating-system sandbox.
