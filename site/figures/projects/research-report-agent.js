(function () {
  'use strict';
  var LF = window.LF;
  if (!LF) { return; }

  var el = LF.el, svgEl = LF.svgEl;
  var INK = 'var(--ink,#1a1a1a)', SOFT = 'var(--ink-soft,#555)', MUTE = 'var(--ink-mute,#777)';
  var BP = 'var(--blueprint,#3553ff)', BG = 'var(--bg,#fafaf5)', SURF = 'var(--bg-surface,#eee)';
  var RULE = 'var(--rule-soft,#ddd)', WARN = 'var(--warn,#b8870f)', BAD = '#d4493f';

  function anim(attr, vals, dur, extra) {
    var a = { attributeName: attr, values: vals, dur: dur, repeatCount: 'indefinite' };
    if (extra) for (var k in extra) a[k] = extra[k];
    return svgEl('animate', a);
  }
  function animT(type, vals, dur, extra) {
    var a = { attributeName: 'transform', type: type, values: vals, dur: dur, repeatCount: 'indefinite' };
    if (extra) for (var k in extra) a[k] = extra[k];
    return svgEl('animateTransform', a);
  }
  function card(host, label, hint, svg, caption) {
    host.setAttribute('data-static-time', '7.5');
    host.appendChild(el('div', { class: 'lf' }, [
      el('div', { class: 'lf-head' }, [el('span', { class: 'lf-label' }, [label]), el('span', {}, [hint])]),
      el('div', { class: 'lf-body' }, [el('div', { class: 'lf-out' }, [svg])]),
      el('div', { class: 'lf-cap' }, [caption])
    ]));
  }
  function txt(x, y, s, fill, size, anchor, weight) {
    var a = {
      x: x, y: y, fill: fill || SOFT, 'font-size': size || 11,
      'font-family': 'var(--font-mono,monospace)', 'text-anchor': anchor || 'middle'
    };
    if (weight) a['font-weight'] = weight;
    return svgEl('text', a, [svgEl('tspan', {}, [document.createTextNode(s)])]);
  }
  function box(x, y, w, h, stroke, fill, dash) {
    var a = { x: x, y: y, width: w, height: h, rx: 4, fill: fill || BG, stroke: stroke || RULE, 'stroke-width': '1.5' };
    if (dash) a['stroke-dasharray'] = dash;
    return svgEl('rect', a);
  }
  function group(children) {
    var g = svgEl('g', {});
    for (var i = 0; i < children.length; i++) g.appendChild(children[i]);
    return g;
  }
  function line(x1, y1, x2, y2, stroke, dash, width) {
    var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: stroke || RULE, 'stroke-width': width || '1.5' };
    if (dash) a['stroke-dasharray'] = dash;
    return svgEl('line', a);
  }
  function arrow(x1, y1, x2, y2, stroke) {
    var g = svgEl('g', {});
    g.appendChild(line(x1, y1, x2, y2, stroke || MUTE));
    var ang = Math.atan2(y2 - y1, x2 - x1);
    var s = 5;
    var p1x = x2 - s * Math.cos(ang - 0.45), p1y = y2 - s * Math.sin(ang - 0.45);
    var p2x = x2 - s * Math.cos(ang + 0.45), p2y = y2 - s * Math.sin(ang + 0.45);
    g.appendChild(svgEl('polygon', { points: x2 + ',' + y2 + ' ' + p1x.toFixed(1) + ',' + p1y.toFixed(1) + ' ' + p2x.toFixed(1) + ',' + p2y.toFixed(1), fill: stroke || MUTE }));
    return g;
  }
  function reveal(node, t0, t1, dur) {
    var a = Math.max(0.001, Math.min(t0, 0.97)), b = Math.min(t1, 0.999);
    node.setAttribute('opacity', '0');
    node.appendChild(anim('opacity', '0;0;1;1;0', dur, { keyTimes: '0;' + a.toFixed(3) + ';' + Math.min(a + 0.02, b).toFixed(3) + ';' + b.toFixed(3) + ';1' }));
    return node;
  }

  function pipeline(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 300' });
    var lanes = [
      { y: 18, name: 'RUST', why: 'fast, safe index', color: WARN },
      { y: 118, name: 'PYTHON', why: 'model glue', color: BP },
      { y: 218, name: 'TYPESCRIPT', why: 'web viewer', color: INK }
    ];
    lanes.forEach(function (l) {
      svg.appendChild(box(6, l.y, 508, 76, RULE, SURF));
      svg.appendChild(txt(16, l.y + 32, l.name, l.color, 12, 'start', '700'));
      svg.appendChild(txt(16, l.y + 50, l.why, MUTE, 9, 'start'));
    });
    function stage(x, y, w, label, color) {
      svg.appendChild(box(x, y, w, 34, color || RULE, BG));
      svg.appendChild(txt(x + w / 2, y + 21, label, INK, 10));
    }
    stage(126, 39, 88, 'corpus', WARN);
    stage(250, 39, 88, 'BM25 index', WARN);
    stage(374, 39, 118, 'JSON on stdout', WARN);
    svg.appendChild(arrow(214, 56, 248, 56));
    svg.appendChild(arrow(338, 56, 372, 56));
    var py = [['plan', 126], ['snippets', 200], ['writer', 274], ['critic', 348], ['score', 422]];
    py.forEach(function (p, i) {
      stage(p[1], 139, 66, p[0], BP);
      if (i) svg.appendChild(arrow(py[i - 1][1] + 66, 156, p[1] - 2, 156));
    });
    stage(126, 239, 100, 'report.json', INK);
    stage(262, 239, 100, 'render.ts', INK);
    stage(398, 239, 100, 'report.html', INK);
    svg.appendChild(arrow(226, 256, 260, 256));
    svg.appendChild(arrow(362, 256, 396, 256));
    svg.appendChild(line(166, 118, 166, 94, BP, '3 3'));
    svg.appendChild(line(433, 94, 433, 118, WARN, '3 3'));
    svg.appendChild(line(381, 194, 381, 218, INK, '3 3'));

    var req = group([box(-34, -9, 68, 18, BP, BG), txt(0, 4, '{"q":…}', BP, 9)]);
    req.appendChild(animT('translate', '166,150;166,150;166,106;294,106;294,106', D, { keyTimes: '0;0.08;0.2;0.3;1' }));
    svg.appendChild(reveal(req, 0.06, 0.3, D));
    var res = group([box(-38, -9, 76, 18, WARN, BG), txt(0, 4, '{"hits":…}', WARN, 9)]);
    res.appendChild(animT('translate', '433,56;433,56;433,106;233,106;233,150;233,150', D, { keyTimes: '0;0.32;0.42;0.52;0.6;1' }));
    svg.appendChild(reveal(res, 0.32, 0.6, D));
    var rep = group([box(-34, -9, 68, 18, INK, BG), txt(0, 4, 'report', INK, 9)]);
    rep.appendChild(animT('translate', '381,156;381,156;381,206;176,206;176,256;176,256', D, { keyTimes: '0;0.64;0.72;0.82;0.9;1' }));
    svg.appendChild(reveal(rep, 0.64, 0.92, D));
    svg.appendChild(txt(260, 111, 'one JSON line per request', MUTE, 9));
    card(host, 'THREE LANGUAGES, ONE PIPELINE', 'each part in the language that fits it',
      svg,
      'Rust owns the search engine because indexing is tight loops over bytes. Python owns the parts that talk to models, and TypeScript renders the report in the browser. The lanes only meet through plain JSON, so each side can be tested and replaced on its own.');
  }

  function bm25(host) {
    var D = '8s';
    var svg = svgEl('svg', { viewBox: '0 0 520 250' });
    svg.appendChild(txt(20, 24, 'query', MUTE, 10, 'start'));
    svg.appendChild(box(70, 10, 74, 22, BP, BG));
    svg.appendChild(txt(107, 25, 'microvm', BP, 10));
    svg.appendChild(box(150, 10, 64, 22, BP, BG));
    svg.appendChild(txt(182, 25, 'kernel', BP, 10));
    var docs = [
      { id: 'doc-03', score: 0.55, final: 2 },
      { id: 'doc-04', score: 0.95, final: 0 },
      { id: 'doc-07', score: 0.25, final: 3 },
      { id: 'doc-02', score: 0.72, final: 1 }
    ];
    docs.forEach(function (d, i) {
      var y0 = 52 + i * 40, yf = 52 + d.final * 40;
      var g = svgEl('g', {});
      g.appendChild(txt(20, 20, d.id, INK, 10, 'start'));
      g.appendChild(box(78, 7, 190, 18, RULE, SURF));
      var bar = svgEl('rect', { x: 78, y: 7, width: 0, height: 18, rx: 3, fill: i === 1 ? BP : 'var(--blueprint-tint-strong,rgba(53,83,255,.25))' });
      bar.appendChild(anim('width', '0;0;' + (190 * d.score).toFixed(0) + ';' + (190 * d.score).toFixed(0) + ';0', D, { keyTimes: '0;0.05;0.35;0.95;1' }));
      g.appendChild(bar);
      var rank = txt(282, 20, '#' + (d.final + 1), MUTE, 10, 'start');
      g.appendChild(reveal(rank, 0.62, 0.95, D));
      g.appendChild(animT('translate', '0,' + y0 + ';0,' + y0 + ';0,' + yf + ';0,' + yf + ';0,' + y0, D, { keyTimes: '0;0.4;0.55;0.95;1' }));
      svg.appendChild(g);
    });
    svg.appendChild(line(320, 12, 320, 238, RULE, '3 3'));
    svg.appendChild(txt(420, 30, 'term frequency saturates', SOFT, 10));
    var ox = 345, oy = 120, w = 150, h = 70;
    svg.appendChild(line(ox, oy, ox + w, oy, MUTE));
    svg.appendChild(line(ox, oy, ox, oy - h, MUTE));
    var d = 'M' + ox + ' ' + oy;
    for (var i = 1; i <= 30; i++) {
      var tf = i / 3, s = (tf * 2.2) / (tf + 1.2);
      d += ' L' + (ox + (i / 30) * w).toFixed(1) + ' ' + (oy - (s / 2.2) * h).toFixed(1);
    }
    var curve = svgEl('path', { d: d, fill: 'none', stroke: BP, 'stroke-width': '2.2', 'stroke-dasharray': '260', 'stroke-dashoffset': '260' });
    curve.appendChild(anim('stroke-dashoffset', '260;0;0', D, { keyTimes: '0;0.4;1' }));
    svg.appendChild(curve);
    svg.appendChild(txt(ox + w, oy + 14, 'tf', MUTE, 9, 'end'));
    svg.appendChild(txt(ox - 4, oy - h + 4, 'score', MUTE, 9, 'end'));
    svg.appendChild(txt(420, 160, 'rare words weigh more (idf)', SOFT, 10));
    svg.appendChild(txt(350, 186, 'kernel', INK, 10, 'start'));
    svg.appendChild(box(410, 176, 90, 14, RULE, SURF));
    svg.appendChild(svgEl('rect', { x: 410, y: 176, width: 30, height: 14, rx: 3, fill: MUTE }));
    svg.appendChild(txt(350, 214, 'microvm', INK, 10, 'start'));
    svg.appendChild(box(410, 204, 90, 14, RULE, SURF));
    svg.appendChild(svgEl('rect', { x: 410, y: 204, width: 78, height: 14, rx: 3, fill: BP }));
    card(host, 'BM25 RANKING', 'score, then sort',
      svg,
      'Each document gets a score from every query word it contains. Repeating a word helps less and less, and a word that appears in few documents counts for more than a common one. The bars settle into the final ranking the search engine returns.');
  }

  function snippetOffsets(host) {
    var D = '8s';
    var svg = svgEl('svg', { viewBox: '0 0 520 220' });
    var sents = [
      { t: 'Containers share the host kernel.', s: 0, e: 33 },
      { t: 'A microVM boots its own guest kernel.', s: 34, e: 71 },
      { t: 'Egress stays deny-by-default.', s: 72, e: 101 }
    ];
    svg.appendChild(txt(20, 22, 'doc-04.md', MUTE, 10, 'start'));
    sents.forEach(function (s, i) {
      var y = 36 + i * 32;
      svg.appendChild(box(20, y, 360, 24, RULE, SURF));
      svg.appendChild(txt(30, y + 16, s.t, INK, 11, 'start'));
      svg.appendChild(txt(392, y + 16, '[' + s.s + ', ' + s.e + ')', MUTE, 10, 'start'));
    });
    var win = svgEl('rect', { x: 17, y: 33, width: 366, height: 30, rx: 5, fill: 'none', stroke: BP, 'stroke-width': '2.5' });
    win.appendChild(animT('translate', '0,0;0,0;0,32;0,32;0,64;0,64;0,32;0,32', D, { keyTimes: '0;0.1;0.2;0.3;0.4;0.5;0.6;1' }));
    svg.appendChild(win);
    var out = group([
      box(20, 146, 480, 58, BP, BG),
      txt(34, 166, 'S3  doc-04  start=34  end=71', BP, 11, 'start', '700'),
      txt(34, 190, 'text == source[34:71]', INK, 11, 'start'),
      txt(486, 190, 'match', BP, 11, 'end', '700')
    ]);
    svg.appendChild(reveal(out, 0.62, 0.98, D));
    card(host, 'SNIPPETS WITH EXACT OFFSETS', 'cite a span, not a vibe',
      svg,
      'The extractor splits each document into sentences and keeps where every sentence starts and ends in the source. A snippet is only valid if slicing the source at those offsets gives back the exact text. That makes every later citation checkable by code.');
  }

  function planFacets(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 250' });
    svg.appendChild(box(110, 10, 300, 30, INK, SURF));
    svg.appendChild(txt(260, 30, 'How should I isolate an AI agent?', INK, 11));
    svg.appendChild(box(20, 70, 70, 44, MUTE, SURF));
    svg.appendChild(svgEl('circle', { cx: 42, cy: 90, r: 9, fill: 'none', stroke: MUTE, 'stroke-width': '1.5' }));
    svg.appendChild(svgEl('circle', { cx: 68, cy: 90, r: 9, fill: 'none', stroke: MUTE, 'stroke-width': '1.5' }));
    svg.appendChild(txt(55, 128, 'recorded', MUTE, 9));
    svg.appendChild(txt(55, 140, 'replies', MUTE, 9));
    svg.appendChild(box(200, 66, 120, 50, BP, BG));
    svg.appendChild(txt(260, 88, 'planner', BP, 12, 'middle', '700'));
    svg.appendChild(txt(260, 104, 'model interface', MUTE, 9));
    svg.appendChild(arrow(260, 40, 260, 64));
    svg.appendChild(arrow(92, 92, 198, 92));
    var badReply = group([box(336, 64, 170, 26, BAD, BG), txt(421, 81, '"Sure! Here are…"', BAD, 10)]);
    var strike = line(342, 77, 500, 77, BAD, null, '2');
    badReply.appendChild(strike);
    badReply.appendChild(txt(421, 102, 'not JSON: rejected', BAD, 9));
    svg.appendChild(reveal(badReply, 0.1, 0.38, D));
    var fallback = group([box(336, 70, 170, 34, BP, BG), txt(421, 91, 'rule-based fallback', BP, 10)]);
    svg.appendChild(reveal(fallback, 0.4, 0.99, D));
    var facets = ['what', 'how', 'risks', 'tradeoffs'];
    facets.forEach(function (f, i) {
      var x = 40 + i * 118;
      var g = group([arrow(260, 118, x + 50, 176, MUTE), box(x, 178, 100, 34, BP, BG), txt(x + 50, 199, f, BP, 11)]);
      svg.appendChild(reveal(g, 0.5 + i * 0.08, 0.99, D));
    });
    svg.appendChild(txt(260, 236, 'each facet becomes one report section', MUTE, 9));
    card(host, 'PLAN THE RESEARCH', 'question to facets',
      svg,
      'The planner turns one question into the few angles a good report must cover. It talks to models through one interface, so tests replay recorded replies instead of calling a live model. When a reply is not valid JSON, the plan falls back to rules instead of failing.');
  }

  function citedWriter(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 250' });
    svg.appendChild(txt(20, 20, 'evidence', MUTE, 10, 'start'));
    var sn = [['S1', 'Containers share the host kernel.'], ['S2', 'A shim intercepts system calls.'], ['S4', 'Each microVM has its own kernel.']];
    sn.forEach(function (s, i) {
      var y = 30 + i * 34;
      svg.appendChild(box(20, y, 150, 26, BP, BG));
      svg.appendChild(txt(28, y + 17, s[0], BP, 10, 'start', '700'));
      svg.appendChild(txt(50, y + 17, s[1].length > 20 ? s[1].slice(0, 19) + '…' : s[1], SOFT, 9, 'start'));
    });
    svg.appendChild(txt(200, 20, 'report sentences', MUTE, 10, 'start'));
    var rows = [
      { t: 'Containers share the host kernel [S1].', ok: true },
      { t: 'Each microVM has its own kernel [S4].', ok: true },
      { t: 'Sandboxes are always safe.', ok: false, why: 'uncited' },
      { t: 'A runtime uses VMs [S99].', ok: false, why: 'dangling S99' }
    ];
    rows.forEach(function (r, i) {
      var y = 30 + i * 34;
      var g = group([box(200, y, 300, 26, r.ok ? RULE : BAD, SURF), txt(210, y + 17, r.t, r.ok ? INK : BAD, 10, 'start')]);
      if (r.ok) g.appendChild(txt(492, y + 17, 'ok', BP, 10, 'end', '700'));
      svg.appendChild(reveal(g, 0.08 + i * 0.14, 0.99, D));
      if (!r.ok) {
        var bad = group([line(206, y + 13, 494, y + 13, BAD, null, '2'), txt(492, y + 40, r.why, BAD, 9, 'end')]);
        svg.appendChild(reveal(bad, 0.2 + i * 0.14, 0.99, D));
      }
    });
    var dot = svgEl('circle', { r: 5, fill: BP });
    dot.appendChild(animT('translate', '170,43;200,43;170,111;200,77;170,43', D, { keyTimes: '0;0.12;0.2;0.3;1' }));
    svg.appendChild(reveal(dot, 0.02, 0.32, D));
    svg.appendChild(txt(260, 180, 'validator rules', MUTE, 10));
    svg.appendChild(txt(260, 200, 'every sentence ends with a marker', SOFT, 10));
    svg.appendChild(txt(260, 218, 'every marker names a real snippet', SOFT, 10));
    card(host, 'WRITE ONLY FROM EVIDENCE', 'no marker, no sentence',
      svg,
      'The writer may only arrange snippets that search found, and every sentence carries the id of its snippet. A separate validator rejects sentences with no marker and markers that point at nothing. Grounding is enforced by code, not by asking nicely.');
  }

  function critic(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 250' });
    svg.appendChild(txt(20, 20, 'sentence', MUTE, 10, 'start'));
    svg.appendChild(txt(330, 20, 'overlap with cited snippet', MUTE, 10, 'start'));
    var rows = [
      { t: 'Containers share the host kernel [S1].', v: 0.92, ok: true },
      { t: 'A microVM has no guest kernel [S4].', v: 0.38, ok: false, why: 'negation flipped' },
      { t: 'Boot takes 900 ms [S6].', v: 0.44, ok: false, why: 'number changed' }
    ];
    rows.forEach(function (r, i) {
      var y = 30 + i * 44;
      svg.appendChild(box(20, y, 296, 28, r.ok ? RULE : RULE, SURF));
      svg.appendChild(txt(28, y + 18, r.t, INK, 9.5, 'start'));
      svg.appendChild(box(330, y + 6, 120, 16, RULE, BG));
      var bar = svgEl('rect', { x: 330, y: y + 6, width: 0, height: 16, rx: 3, fill: r.ok ? BP : BAD });
      bar.appendChild(anim('width', '0;0;' + (120 * r.v).toFixed(0) + ';' + (120 * r.v).toFixed(0) + ';0', D, { keyTimes: '0;' + (0.05 + i * 0.12).toFixed(2) + ';' + (0.15 + i * 0.12).toFixed(2) + ';0.96;1' }));
      svg.appendChild(bar);
      var verdict = r.ok ? txt(460, y + 19, 'kept', BP, 10, 'start', '700') : txt(460, y + 19, 'flagged', BAD, 10, 'start', '700');
      svg.appendChild(reveal(verdict, 0.16 + i * 0.12, 0.99, D));
      if (!r.ok) svg.appendChild(reveal(txt(316, y + 40, r.why, BAD, 9, 'end'), 0.18 + i * 0.12, 0.99, D));
    });
    svg.appendChild(txt(20, 184, 'run budget', MUTE, 10, 'start'));
    svg.appendChild(box(100, 173, 260, 16, RULE, BG));
    var budget = svgEl('rect', { x: 100, y: 173, width: 260, height: 16, rx: 3, fill: WARN });
    budget.appendChild(anim('width', '260;260;110;110;260', D, { keyTimes: '0;0.05;0.6;0.97;1' }));
    svg.appendChild(budget);
    svg.appendChild(txt(370, 185, 'steps left', MUTE, 9, 'start'));
    var badge = group([box(100, 206, 260, 30, BP, BG), txt(230, 226, 'completed · 2 sentences dropped', BP, 11, 'middle', '700')]);
    svg.appendChild(reveal(badge, 0.62, 0.99, D));
    card(host, 'VERIFY EVERY CLAIM', 'the critic reads the source',
      svg,
      'The critic compares each sentence with the snippet it cites and flags sentences the source does not support, like a flipped negation or a changed number. It runs inside a budget and always ends in a named state, so a run never just stops silently.');
  }

  function publish(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 260' });
    svg.appendChild(box(16, 30, 92, 40, INK, SURF));
    svg.appendChild(txt(62, 55, 'report.json', INK, 10));
    svg.appendChild(arrow(108, 50, 136, 50));
    svg.appendChild(box(138, 30, 86, 40, INK, SURF));
    svg.appendChild(txt(181, 55, 'render.ts', INK, 10));
    svg.appendChild(arrow(224, 50, 252, 50));
    svg.appendChild(box(254, 14, 250, 168, INK, BG));
    svg.appendChild(svgEl('rect', { x: 254, y: 14, width: 250, height: 16, fill: SURF }));
    svg.appendChild(txt(266, 26, 'report.html', MUTE, 9, 'start'));
    svg.appendChild(txt(266, 50, 'Isolating agents', INK, 12, 'start', '700'));
    svg.appendChild(txt(266, 72, 'Containers share the host', SOFT, 10, 'start'));
    svg.appendChild(txt(266, 86, 'kernel.', SOFT, 10, 'start'));
    svg.appendChild(txt(310, 86, '[1]', BP, 10, 'start', '700'));
    svg.appendChild(txt(266, 104, 'Each microVM has its own', SOFT, 10, 'start'));
    svg.appendChild(txt(266, 118, 'kernel.', SOFT, 10, 'start'));
    var m2 = txt(310, 118, '[2]', BP, 10, 'start', '700');
    svg.appendChild(m2);
    var ring = svgEl('rect', { x: 306, y: 107, width: 22, height: 15, rx: 3, fill: 'none', stroke: BP, 'stroke-width': '1.5' });
    svg.appendChild(reveal(ring, 0.3, 0.8, D));
    var cursor = svgEl('polygon', { points: '0,0 0,13 4,10 7,16 9,15 6,9 11,9', fill: INK });
    cursor.appendChild(animT('translate', '470,160;470,160;320,122;320,122;470,160', D, { keyTimes: '0;0.1;0.28;0.82;1' }));
    var pop = group([box(270, 132, 222, 42, BP, SURF), txt(280, 149, '"Each microVM runs its own', INK, 9.5, 'start'), txt(280, 164, 'guest kernel."  doc-04', INK, 9.5, 'start')]);
    svg.appendChild(reveal(pop, 0.3, 0.8, D));
    svg.appendChild(cursor);
    svg.appendChild(txt(16, 210, 'trace.json', MUTE, 10, 'start'));
    var segs = [['search', 60, WARN], ['plan', 50, BP], ['write', 90, BP], ['verify', 80, BP], ['publish', 60, INK]];
    var x = 90;
    segs.forEach(function (s, i) {
      var r = svgEl('rect', { x: x, y: 200, width: s[1], height: 16, fill: s[2], opacity: '0.85' });
      svg.appendChild(reveal(r, 0.05 + i * 0.1, 0.99, D));
      svg.appendChild(txt(x + s[1] / 2, 234, s[0], MUTE, 9));
      x += s[1] + 2;
    });
    card(host, 'PUBLISH THE REPORT', 'footnotes quote the source',
      svg,
      'TypeScript turns report.json into a page where every footnote marker opens the exact source sentence it cites. Next to the report, trace.json records each step, how long it took, and how the run ended, so a reader can audit both the claims and the process.');
  }

  function scorecard(host) {
    var D = '9s';
    var svg = svgEl('svg', { viewBox: '0 0 520 240' });
    svg.appendChild(txt(20, 20, 'public fixtures', MUTE, 10, 'start'));
    for (var i = 0; i < 6; i++) {
      var y = 30 + i * 26;
      svg.appendChild(box(20, y, 120, 20, RULE, SURF));
      svg.appendChild(txt(30, y + 14, 'Q' + (i + 1), INK, 10, 'start'));
      svg.appendChild(reveal(txt(128, y + 14, 'run', BP, 9, 'end', '700'), 0.05 + i * 0.06, 0.99, D));
    }
    var gauges = [['citation precision', 1.0, '1.00'], ['source recall', 0.92, '0.92'], ['fact coverage', 0.67, '0.67']];
    gauges.forEach(function (g, i) {
      var y = 34 + i * 40;
      svg.appendChild(txt(170, y, g[0], SOFT, 10, 'start'));
      svg.appendChild(box(170, y + 6, 240, 14, RULE, BG));
      var bar = svgEl('rect', { x: 170, y: y + 6, width: 0, height: 14, rx: 3, fill: BP });
      bar.appendChild(anim('width', '0;0;' + (240 * g[1]).toFixed(0) + ';' + (240 * g[1]).toFixed(0) + ';0', D, { keyTimes: '0;0.4;' + (0.5 + i * 0.05).toFixed(2) + ';0.96;1' }));
      svg.appendChild(bar);
      svg.appendChild(reveal(txt(420, y + 18, g[2], INK, 10, 'start', '700'), 0.5 + i * 0.05, 0.99, D));
    });
    svg.appendChild(txt(470, 110, '87.5', BP, 26, 'middle', '700'));
    svg.appendChild(txt(470, 130, 'score / 100', MUTE, 9));
    var sy = 200;
    svg.appendChild(line(20, sy, 500, sy, MUTE));
    [0, 25, 50, 75, 100].forEach(function (t) {
      var x = 20 + t * 4.8;
      svg.appendChild(line(x, sy - 4, x, sy + 4, MUTE));
      svg.appendChild(txt(x, sy + 18, String(t), MUTE, 9));
    });
    var mx = 20 + 87.5 * 4.8;
    var marker = group([svgEl('polygon', { points: (mx - 6) + ',' + (sy - 14) + ' ' + (mx + 6) + ',' + (sy - 14) + ' ' + mx + ',' + (sy - 3), fill: WARN }), txt(mx, sy - 20, 'beat this', WARN, 10, 'middle', '700')]);
    svg.appendChild(reveal(marker, 0.78, 0.99, D));
    card(host, 'SCORE THE PUBLIC FIXTURES', 'reference baseline',
      svg,
      'The scorecard runs the whole pipeline on six checked-in public evaluation questions. It checks lexical citation support, expected sources and key facts. The reference baseline scores 87.5 on these fixtures; the demo also uses question h4. Compare all three metrics, and use separate private questions to measure generalization.');
  }

  LF.register({
    'pj-rra-pipeline': pipeline,
    'pj-rra-bm25': bm25,
    'pj-rra-snippet-offsets': snippetOffsets,
    'pj-rra-plan-facets': planFacets,
    'pj-rra-cited-writer': citedWriter,
    'pj-rra-critic': critic,
    'pj-rra-publish': publish,
    'pj-rra-scorecard': scorecard
  });
})();
