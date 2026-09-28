# Project validation

Verified locally on 2026-09-29. These results describe the checked implementations and supplied fixtures, not production performance or a hosted assessment.

| Surface | Result |
|---|---|
| Core project grader | 48 projects, 196 stages, 1,321 tests pass, zero skips |
| Grader, builder, certificate contracts | 23 tests pass |
| Optional framework SDK integrations | 29 additional tests pass: LangChain 5, Google ADK 10, AWS Strands 5, Mastra 9 |
| Fresh learner workspaces | All 48 initialize and fail their unfinished first stage |
| Mechanism figures | All 197 mount and update visible calculated results in Chromium |
| Project pages | All 48 load bundled lessons, figures, and recordings |
| Recordings | 100 GIFs with static posters and command/capture provenance |
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

The local core run used Python 3.12.12, Node 25.6.1, Rust 1.95.0, and Go 1.26.0 on macOS arm64. The optional Python SDK suites used Python 3.12 in an isolated environment. Framework versions and installation commands are pinned in each project's dependency files. The project CI separately uses Python 3.12, Node 24, Go 1.23, and the runner's Rust toolchain; a local pass does not establish remote CI status.

## Browser and artifact checks

The served catalog, pilot and document-extraction page were inspected at 1440x950 in light mode and 390x950 in dark mode, extending earlier checks of both themes at both widths. All 48 project pages were opened independently to exercise dynamic provider loading. All 197 mechanism figures mounted, accepted changed inputs and updated their visible calculations without initial errors. Earlier interface checks covered project filtering, stage navigation and browser history, saved completion, recording play/stop, and certificate import.

The eight new application outputs were inspected at 1120 and 390 pixels. The document review check selected a source span after a Unicode character, downloaded the actual approval, applied it through the CLI, and reopened the approved page without losing the choice. The study coach recorded an incorrect answer and a correct answer in the browser; its downloaded attempt events replayed through the CLI into the expected schedule.

Certificate import rejected reference-solution evidence and accepted a complete learner-mode QA report. The QA workspace intentionally copied a reference implementation solely to exercise the interface; no learner achievement is claimed. Certificates remain local self-attested community records. They cannot establish identity or prevent a user from copying code or modifying JSON.

The browser-agent adapter drove real Chromium against its local fixture and captured its result. The Rust shell was exercised through actual stdin/stdout and a PTY. The pilot report was opened in Chromium with citation inspection and its trace expanded. Terminal GIFs render captured command output; application output GIFs use actual browser frame captures. The four framework GIFs record the current optional graders, with core and additional SDK test counts distinguished.

## Integration and regression checks

Durable jobs and the evaluation farm ran real child processes, crashed at documented boundaries, recovered persisted work and rejected stale completions. Harness and gateway binaries made actual loopback HTTP requests with call budgets, distinct credentials, deadlines and bounded response bodies. Mastra suspended a workflow in one process and resumed the same stored run in another. Official MCP clients exercised the teaching servers over stdio and HTTP.

Cross-project checks include audited dataset partitions into evaluation, PR findings into the review panel, installed skill bundles into the native Rust validator, and research reports into the judge. Independent application review reproduced and fixed three additional defects: large CSV identifiers merging, approved extraction selections disappearing on export, and postmortem text dropping review metadata. Regression tests and the original reproductions pass.

## Limits

Native macOS desktop control was not executed. Fixture-backend success does not verify Accessibility permissions or native interactions. Optional framework suites import and execute real SDKs with deterministic local models; no live model-provider, Bedrock, or other cloud calls were made. Voice tests verify real WAV/multipart transport with controlled responses; the offline transcript is explicitly supplied, so these tests do not measure recognition accuracy. Visual search uses supplied text rectangles rather than claiming OCR.

Sandbox stages teach policy planning; the optional Docker probe was not exercised. Queue and farm recovery covers cooperating processes on a local filesystem, not distributed storage or exactly-once external effects. Evaluation datasets are public teaching fixtures, and their scores do not establish unseen performance. Source hashes bind content, not reviewer identity. Local drafts do not send email, publish issues or change an account calendar.
