# Report Judge

Audit sentence-level citations, test lexical support, and compare report revisions with a paired uncertainty interval.

Python standard library. Four cumulative stages and 20 deterministic tests.

```figure
pj-report-judge-1
```

## Start

```bash
python3 scripts/project_test.py report-judge --init my-report-judge
python3 scripts/project_test.py report-judge --stage 1 --path my-report-judge
```

1. **Parse claims and citation references**: One [S1]. Two [S2]. becomes two independently auditable claims.
2. **Check evidence before averaging scores**: Changing a sourced limit from 10 to 5 yields reason number and support zero.
3. **Report precision coverage and source recall**: A report citing one of two expected sources has recall 0.5, even with perfect precision.
4. **Compare paired revisions with bootstrap intervals**: Uniform +1 improvements yield mean delta 1 and interval [1, 1].

## Reference demo

```bash
python3 projects/report-judge/solution/demo.py
python3 scripts/project_test.py report-judge --solution
```

Each stage lesson explains its mechanism and limits. The demo runs on deterministic local inputs and does not contact a model or a service.
