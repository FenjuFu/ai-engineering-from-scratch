from pathlib import Path
import subprocess
import tempfile

root = Path(__file__).resolve().parent
with tempfile.TemporaryDirectory(prefix="project-demo-") as temp:
    binary = Path(temp) / "demo"
    subprocess.run(["rustc", "--edition", "2021", "-Awarnings", str(root / "main.rs"), "-o", str(binary)], check=True)
    subprocess.run([str(binary)], check=True)
