# Self-Improving Skill Loop

Improve an explicit routing skill from labeled development errors, then require a separate evaluation gate before promotion.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-self-improving-skill-loop-1
```

## Start

```bash
python3 scripts/project_test.py self-improving-skill-loop --init my-self-improving-skill-loop
python3 scripts/project_test.py self-improving-skill-loop --stage 1 --path my-self-improving-skill-loop
```

1. **Split labeled cases without identity leakage**: Every case appears in exactly one partition; a repeated id stops the run.
2. **Execute and score a transparent routing skill**: The rule [reset, password] matches reset password but does not match reset only.
3. **Propose rules from development errors only**: A repeated refund token proposes billing; a token shared by two labels is rejected.
4. **Require a separate gate before promotion**: A candidate that fixes one case but breaks a previously correct case cannot be promoted.

## Reference demo

```bash
python3 projects/self-improving-skill-loop/solution/demo.py
python3 scripts/project_test.py self-improving-skill-loop --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.
