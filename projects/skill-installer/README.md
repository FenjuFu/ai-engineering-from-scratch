# Cross-Agent Skill Installer

Validate local skill bundles, translate agent metadata, verify content digests, and atomically install without overwriting learner edits.

Build the four stages in order. The core runs without model credentials or package installation. Node 22.18+ is required; Python 3 and Rust are additionally required where listed below.

```bash
python3 scripts/project_test.py skill-installer --init learning-artifacts/skill-installer
python3 scripts/project_test.py skill-installer --path learning-artifacts/skill-installer
cd projects/skill-installer/solution
node main.ts --demo
```

The `starter` intentionally fails. `solution` contains the runnable reference; stage tests always import the chosen workspace. Tests exercise the documented subset, not every behavior of an external standard.

## Stages

1. [Validate a portable bundle](stages/01-bundle/docs/en.md)
2. [Translate metadata and hash content](stages/02-translate/docs/en.md)
3. [Install atomically within a root](stages/03-install/docs/en.md)
4. [Protect edits during upgrades](stages/04-upgrades/docs/en.md)

## Primary sources

- [Agent Skills specification](https://agentskills.io/specification)
- [Node crypto API](https://nodejs.org/api/crypto.html)
- [Node filesystem API](https://nodejs.org/api/fs.html)

Source references checked 2026-09-28. Implementations and fixtures are original. No live provider calls are part of the baseline.
