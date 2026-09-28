# Project validation

Verified locally on 2026-09-28. These results describe the checked implementations and supplied fixtures, not production performance or a hosted assessment.

| Surface | Result |
|---|---|
| Core project grader | 40 projects, 164 stages, 937 tests pass, zero skips |
| Grader, builder, certificate contracts | 23 tests pass |
| Optional SDK integrations | 20 additional tests pass across LangChain, Google ADK, AWS Strands, and Mastra |
| Fresh learner workspaces | All 40 initialize and fail their unfinished first stage |
| Stage mechanisms | All 164 figures mount in Chromium |
| Project pages | All 40 load bundled lessons, figures, and recordings |
| Recordings | 84 GIFs with static posters and command/capture provenance |
| Course invariants | 523 lessons and 67 certification lessons pass audits; README/book counts match |

## Reproduce

```bash
node site/build.js
node site/build-projects.js --strict
node --test site/test_projects_data.js site/test_project_certificates.js
python3 scripts/project_test.py --all --solution --strict --report /tmp/project-results.json
python3 scripts/audit_lessons.py
python3 scripts/audit_certifications.py
python3 scripts/check_readme_counts.py
```

The local core run used Python 3.14.6, Node 25.6.1, Rust 1.95.0, and Go 1.26.0 on macOS arm64. The optional Python SDK suites used Python 3.12 in an isolated environment. Framework versions and installation commands are pinned in each project's dependency files. The project CI separately uses Python 3.12, Node 24, Go 1.23, and the runner's Rust toolchain; a local pass does not establish remote CI status.

## Browser and artifact checks

The served catalog and pilot were inspected at 1440x900 and 390x844 in light and dark themes. Generic mechanism diagrams also received desktop/mobile inspection; narrow layouts stack steps with readable labels. Checks covered horizontal overflow, project filtering, stage navigation and browser history, saved completion, recording play/stop, and certificate import. All project pages were opened independently to exercise dynamic provider loading.

Certificate import rejected reference-solution evidence and accepted a complete learner-mode QA report. The QA workspace intentionally copied a reference implementation solely to exercise the interface; no learner achievement is claimed. Certificates remain local self-attested community records. They cannot establish identity or prevent a user from copying code or modifying JSON.

The browser-agent adapter drove real Chromium against its local fixture and captured its result. The Rust shell was exercised through actual stdin/stdout and a PTY. The pilot report was opened in Chromium with citation inspection and its trace expanded. Terminal GIFs render captured command output; they are reproducible transcripts rather than screen recordings. The pilot output GIF uses browser frame captures.

## Limits

Native macOS desktop control was not executed. Fixture-backend success does not verify Accessibility permissions or native interactions. Optional framework suites import and execute real SDKs with deterministic local models; no live model-provider, Bedrock, or other cloud calls were made. Sandbox stages teach policy planning and do not create operating-system isolation. Evaluation datasets are public fixtures. The pilot's 87.5/100 score includes a question used by its demo and is not a blind benchmark.
