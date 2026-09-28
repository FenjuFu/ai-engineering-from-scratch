import json
from main import *
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as folder:
    p = Path(folder)
    (p / "tests").mkdir()
    (p / "calc.py").write_text("def add(a,b):\n    return a-b\n")
    (p / "tests" / "test_calc.py").write_text(
        "import unittest\nfrom calc import add\nclass Addition(unittest.TestCase):\n def test_add(self):self.assertEqual(add(2,3),5)\n"
    )
    result = agent_loop(
        p,
        [
            {"tool": "test"},
            {"tool": "patch", "path": "calc.py", "old": "a-b", "new": "a+b"},
            {"tool": "test"},
        ],
    )
    print(json.dumps(result, indent=2))
