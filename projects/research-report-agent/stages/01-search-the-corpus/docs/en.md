# Search the corpus

> Retrieval decides which evidence the rest of the system can use.

**Type:** Build
**Languages:** Rust, Python
**Stage:** 1 of 7 (starter)
**Time:** ~2 hours

## What you build

Implement `search/main.rs`: a standard-library-only Rust engine that loads markdown documents, builds a BM25 index and handles one JSON request per line. Python's `report_agent/search.py` compiles and invokes that engine; it does not implement a second ranking algorithm.

```figure
pj-rra-bm25
```

Rust fits the indexing work because ownership makes the index lifetime explicit and native loops handle term counts efficiently. Python remains a small orchestration layer. A language boundary is useful only when both sides have a clear contract and tests that exercise the real process.

## Parse the corpus

Each document starts with three header lines, a blank line and original explanatory text:

```text
title: A user-space kernel intercepts system calls
source_url: https://www.kernel.org/doc/html/latest/userspace-api/seccomp_filter.html
published: 2026-09-28

A user-space kernel implements an application kernel between a sandboxed process and the host.
```

The fixture corpus contains 12 original notes on isolation concepts. Source links identify supporting official specifications or documentation; these notes are teaching fixtures, not copied product documentation. Missing header fields are errors. Keep the body separate from metadata, and sort file paths before loading them so tests do not depend on directory enumeration order.

## Build the index

Tokenize the title and body, lowercase ASCII letters, keep digits, and remove the provided stopwords. Count how often each term occurs in each document and in how many documents it occurs. Document frequency counts documents, not occurrences.

```text
idf(t) = log(1 + (N - df(t) + 0.5) / (df(t) + 0.5))
score(t,d) = idf(t) * tf(t,d) * (k1+1)
             / (tf(t,d) + k1 * (1-b + b*len(d)/avglen))
```

With `k1=1.5`, repeating a word helps less as its frequency grows. With `b=0.75`, long documents receive a length correction. A rare term such as `interceptor` contributes more than `kernel`. Sum the contribution of query terms and sort by descending score, then ascending document id. An empty query or an unknown word returns no results.

## Define the process contract

A request has an operation and typed fields. The engine flushes each response line and exits when stdin reaches EOF. It writes diagnostics to stderr so stdout remains parseable JSON.

```json
{"query":"daemon socket","k":3}
```

```json
{"cmd":"tokenize","text":"The kernel, VM!"}
```

The second request returns exactly `{"tokens":["kernel","vm"]}`. The protocol also supports `idf`, `docs`, `doc` and `score`. Invalid JSON or wrong field types return an `error` object. Implement strings and escapes according to [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259), including Unicode surrogate pairs. A fractional result limit is invalid; zero is a valid empty result request.

Python compiles the source to a temporary binary keyed by its content hash. Each index writes its input documents to a private temporary directory. Use an argument list with `subprocess.run`, a timeout, and explicit return-code checks. Never put a question into a shell command.

## Your task

Implement the Rust parser, tokenizer, `Index`, JSON codec and `handle_line`. Complete the Python corpus loader and adapter with the existing `BM25Index`, `search`, `score` and `idf` API. Python sentence scoring later reuses the same tokenization rule, while document ranking stays in Rust.

```bash
python3 scripts/project_test.py research-report-agent --init my-report-agent
python3 scripts/project_test.py research-report-agent --stage 1 --path my-report-agent
rustc --edition 2021 -O my-report-agent/search/main.rs -o /tmp/rra-search
printf '%s\n' '{"query":"daemon socket","k":3}' | /tmp/rra-search projects/research-report-agent/fixtures/corpus
```

## What you should see

The fresh workspace fails with a clear stage 1 implementation message. A completed workspace passes 7 Rust tests and 11 Python integration tests. The query ranks `03-daemon-socket-escape` first, with a positive score; the exact score depends on the fixture text. The native tests cover malformed JSON, Unicode round trips, rare-term weighting and deterministic ties.

## Check yourself

Why does document frequency count a repeated term once per document? What happens if stdout contains a build log before its JSON response? Which query will keyword search miss because the relevant note uses a synonym?

## Going further

Add an embedding index and fuse rankings only after this baseline is measured. Keep the wire format unchanged so the planner and writer can use either backend.
