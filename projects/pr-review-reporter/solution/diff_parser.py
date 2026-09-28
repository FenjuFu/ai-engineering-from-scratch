"""Unified diff reader for the PR Review Reporter; stdin -> JSON added lines.
See ../stages/01-diff-lines/docs/en.md and git-scm.com/docs/diff-format.
Reject malformed hunk accounting instead of fabricating line locations.
This reader handles textual git patches, not binary or combined diffs.
"""
import json, re, sys

def parse(raw):
    out, file, line, old_left, new_left = [], None, 0, 0, 0
    for text in raw.splitlines():
        if text.startswith('diff --git '):
            if old_left or new_left: raise ValueError('truncated hunk')
            file = None
        elif text.startswith('+++ '):
            file = text[4:]
            if file.startswith('b/'): file = file[2:]
            if file == '/dev/null': file = None
            elif file.startswith('/') or '..' in file.split('/'): raise ValueError('unsafe file')
        elif text.startswith('@@ '):
            if old_left or new_left: raise ValueError('truncated hunk')
            match = re.match(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', text)
            if not match or file is None: raise ValueError('bad hunk')
            old_left = int(match[2]) if match[2] is not None else 1
            line = int(match[3]); new_left = int(match[4]) if match[4] is not None else 1
        elif old_left or new_left:
            if text.startswith('\\'): continue
            if text.startswith('+'):
                out.append({'file': file, 'line': line, 'text': text[1:]}); line += 1; new_left -= 1
            elif text.startswith('-'): old_left -= 1
            elif text.startswith(' '): line += 1; old_left -= 1; new_left -= 1
            else: raise ValueError('bad hunk line')
            if min(old_left, new_left) < 0: raise ValueError('hunk count mismatch')
    if old_left or new_left: raise ValueError('truncated hunk')
    return out

if __name__ == '__main__':
    try: print(json.dumps(parse(sys.stdin.read())))
    except ValueError as error: print(str(error), file=sys.stderr); sys.exit(1)
