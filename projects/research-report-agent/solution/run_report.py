"""Command line entry point for the Research Report Agent.

Lesson: projects/research-report-agent/README.md
Usage: python3 solution/run_report.py "question" --out out/
       python3 solution/run_report.py --eval heldout/questions.json [--code DIR]
"""

import argparse
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DEFAULT_CORPUS = HERE.parent / "fixtures" / "corpus"


def parse_args(argv):
    parser = argparse.ArgumentParser(
        description="Generate a cited research report from a local corpus."
    )
    parser.add_argument("question", nargs="?", help="research question")
    parser.add_argument(
        "--corpus", default=str(DEFAULT_CORPUS), help="directory of markdown documents"
    )
    parser.add_argument(
        "--out", default="out", help="output directory for report.html and trace.json"
    )
    parser.add_argument(
        "--eval",
        dest="eval_path",
        help="score a questions.json file instead of one question",
    )
    parser.add_argument(
        "--code",
        default=str(HERE),
        help="directory holding the report_agent package to run",
    )
    args = parser.parse_args(argv)
    if not args.eval_path and not args.question:
        parser.error("give a question or --eval")
    return args


def main(argv=None):
    args = parse_args(argv)
    sys.path.insert(0, str(Path(args.code).resolve()))
    from report_agent.evaluate import evaluate, format_scorecard
    from report_agent.pipeline import run_pipeline

    if args.eval_path:
        print(format_scorecard(evaluate(args.eval_path, args.corpus)))
        return 0
    report, trace, _ = run_pipeline(args.question, args.corpus, out_dir=args.out)
    print(f"state      {trace['terminal_state']}")
    print(f"sections   {len(report.sections)}")
    print(
        f"sentences  {trace['counts']['sentences']} (dropped {trace['counts']['dropped']})"
    )
    print(f"report     {Path(args.out) / 'report.html'}")
    print(f"trace      {Path(args.out) / 'trace.json'}")
    return 0 if trace["terminal_state"] != "failed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
