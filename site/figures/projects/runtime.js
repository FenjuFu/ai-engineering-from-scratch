(function () {
  'use strict';
  var serial = 0;
  function lab(host, config, step) {
    var LF = window.LF;
    var values = {};
    var inputs = [];
    var form = LF.el('div', { class: 'pj-lab-inputs' });
    var summary = LF.el('p', { class: 'pj-lab-summary', 'aria-live': 'polite' });
    var metrics = LF.el('dl', { class: 'pj-lab-metrics' });
    var chart = LF.svgEl('svg', { viewBox: '0 0 560 100', role: 'img', 'aria-label': 'Computed comparison' });
    var tableHost = LF.el('div', { class: 'pj-lab-table' });
    var reset = LF.el('button', { type: 'button', class: 'pj-chip' }, ['Reset inputs']);
    var root = LF.el('section', { class: 'pj-mechanism-lab', 'aria-label': 'Interactive mechanism' }, [
      LF.el('p', { class: 'pj-small' }, ['Change an input, predict the result, then inspect the computed state.']),
      form, reset, summary, metrics, chart, tableHost
    ]);
    if (!document.getElementById('pj-lab-styles')) {
      document.head.appendChild(LF.el('style', { id: 'pj-lab-styles' }, [
        '.pj-mechanism-lab{border-top:1px solid var(--rule-soft);margin-top:20px;padding-top:16px}' +
        '.pj-lab-inputs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr));gap:16px;margin:14px 0}' +
        '.pj-lab-field{display:flex;flex-direction:column;gap:8px;min-width:0;font-size:13px}' +
        '.pj-lab-field input,.pj-lab-field select{width:100%;max-width:100%;box-sizing:border-box;accent-color:var(--blueprint)}' +
        '.pj-lab-field input:not([type=range]):not([type=checkbox]),.pj-lab-field select{padding:8px;border:1px solid var(--rule-soft);background:var(--bg);color:var(--ink);border-radius:3px}' +
        '.pj-lab-field input[type=checkbox]{width:20px;height:20px}.pj-lab-field output{font-family:var(--font-mono);font-size:12px;overflow-wrap:anywhere}' +
        '.pj-lab-summary{font-weight:600;overflow-wrap:anywhere}.pj-lab-metrics{display:flex;flex-wrap:wrap;gap:14px;margin:16px 0}' +
        '.pj-lab-metrics>div{flex:1;min-width:110px;padding:10px;background:var(--bg-surface);border:1px solid var(--rule-soft)}' +
        '.pj-lab-metrics dt{font-size:12px;color:var(--ink-mute)}.pj-lab-metrics dd{margin:5px 0 0;font-family:var(--font-mono);overflow-wrap:anywhere}' +
        '.pj-lab-table{overflow-x:auto;max-width:100%}.pj-lab-table table{width:100%;border-collapse:collapse;font-size:12px}' +
        '.pj-lab-table th,.pj-lab-table td{text-align:left;padding:8px;border-bottom:1px solid var(--rule-soft);overflow-wrap:anywhere}' +
        '.pj-lab-table th{font-weight:600}.pj-mechanism-lab>svg{display:block;width:100%;max-height:360px}'
      ]));
    }
    function read(control, input) {
      if (control.type === 'checkbox') return input.checked;
      if (control.type === 'range' || control.type === 'number') {
        if (input.value.trim() === '') throw new Error(control.label + ' needs a number.');
        var n = Number(input.value);
        if (!Number.isFinite(n)) throw new Error(control.label + ' needs a finite number.');
        if (control.min !== undefined && n < control.min || control.max !== undefined && n > control.max) {
          throw new Error(control.label + ' is outside the declared range.');
        }
        return n;
      }
      return input.value;
    }
    function draw() {
      metrics.replaceChildren();
      chart.replaceChildren();
      chart.hidden = true;
      chart.style.display = 'none';
      tableHost.replaceChildren();
      try {
        inputs.forEach(function (field) {
          values[field.control.key] = read(field.control, field.input);
          field.output.textContent = String(values[field.control.key]);
        });
        var result = config.calculate(Object.assign({}, values), step()) || {};
        summary.textContent = result.summary || '';
        summary.removeAttribute('data-error');
        (result.metrics || []).forEach(function (metric) {
          metrics.appendChild(LF.el('div', {}, [LF.el('dt', {}, [String(metric.label)]), LF.el('dd', {}, [String(metric.value)])]));
        });
        var bars = (result.bars || []).filter(function (bar) { return Number.isFinite(bar.value); });
        if (bars.length) {
          var maximum = Math.max.apply(null, bars.map(function (bar) { return Math.max(Math.abs(bar.value), Number(bar.max) || 0); }).concat([1]));
          chart.hidden = false;
          chart.style.display = 'block';
          chart.setAttribute('viewBox', '0 0 560 ' + (bars.length * 58 + 12));
          bars.forEach(function (bar, i) {
            var y = 10 + i * 58;
            chart.appendChild(LF.svgEl('text', { x: 0, y: y + 14, fill: 'var(--ink)', 'font-size': 14 }, [document.createTextNode(String(bar.label))]));
            chart.appendChild(LF.svgEl('rect', { x: 0, y: y + 24, width: 440, height: 14, rx: 2, fill: 'var(--rule-soft)' }));
            chart.appendChild(LF.svgEl('rect', { x: 0, y: y + 24, width: Math.abs(bar.value) / maximum * 440, height: 14, rx: 2, fill: 'var(--blueprint)' }));
            chart.appendChild(LF.svgEl('text', { x: 450, y: y + 36, fill: 'var(--ink)', 'font-size': 14, 'font-family': 'var(--font-mono)' }, [document.createTextNode(String(Math.round(bar.value * 1000) / 1000))]));
          });
        }
        if (result.columns && result.rows) {
          var table = LF.el('table');
          table.appendChild(LF.el('thead', {}, [LF.el('tr', {}, result.columns.map(function (column) { return LF.el('th', { scope: 'col' }, [String(column)]); }))]));
          table.appendChild(LF.el('tbody', {}, result.rows.map(function (row) { return LF.el('tr', {}, row.map(function (cell) { return LF.el('td', {}, [String(cell)]); })); })));
          tableHost.appendChild(table);
        }
      } catch (error) {
        summary.textContent = 'Check the input: ' + error.message;
        summary.setAttribute('data-error', 'true');
      }
    }
    (config.controls || []).forEach(function (control) {
      var id = 'pj-lab-' + (++serial);
      var input;
      if (control.type === 'select') {
        input = LF.el('select', { id: id }, (control.options || []).map(function (option) {
          return LF.el('option', { value: option.value }, [String(option.label)]);
        }));
      } else {
        var attrs = { id: id, type: control.type || 'number' };
        ['min', 'max', 'step'].forEach(function (key) { if (control[key] !== undefined) attrs[key] = control[key]; });
        input = LF.el('input', attrs);
      }
      input.value = String(control.value === undefined ? '' : control.value);
      if (control.type === 'checkbox') input.checked = !!control.value;
      var output = LF.el('output', { for: id });
      inputs.push({ control: control, input: input, output: output });
      input.addEventListener(control.type === 'select' || control.type === 'checkbox' ? 'change' : 'input', draw);
      form.appendChild(LF.el('div', { class: 'pj-lab-field' }, [LF.el('label', { for: id }, [control.label]), input, output]));
    });
    reset.addEventListener('click', function () {
      inputs.forEach(function (field) {
        field.input.value = String(field.control.value === undefined ? '' : field.control.value);
        if (field.control.type === 'checkbox') field.input.checked = !!field.control.value;
      });
      draw();
    });
    host.appendChild(root);
    draw();
    return draw;
  }
  function register(id, config) {
    var providers = {};
    providers[id] = function (host) {
      var LF = window.LF;
      var steps = config.steps || [];
      var index = 0;
      var timer = null;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      var heading = LF.el('div', { class: 'lf-head' }, [LF.el('span', { class: 'lf-label' }, [config.title])]);
      var svg = LF.svgEl('svg', { viewBox: '0 0 560 92', role: 'img', 'aria-label': config.title });
      var detail = LF.el('p', { class: 'pj-figure-detail', 'aria-live': 'polite' });
      var controls = LF.el('div', { class: 'pj-figure-controls' });
      var play = LF.el('button', { type: 'button', class: 'pj-chip' }, ['Play']);
      var next = LF.el('button', { type: 'button', class: 'pj-chip' }, ['Next step']);
      var status = LF.el('span', { class: 'pj-small' });
      controls.append(play, next, status);
      host.appendChild(LF.el('div', { class: 'lf' }, [heading, LF.el('div', { class: 'lf-body' }, [svg, controls, detail]), LF.el('div', { class: 'lf-cap' }, [config.caption || 'Step through the mechanism and predict the next state.'])]));
      var updateLab = config.lab && typeof config.lab.calculate === 'function' ? lab(host.querySelector('.lf-body'), config.lab, function () { return index; }) : null;
      function draw() {
        svg.replaceChildren();
        var narrow = host.clientWidth < 480;
        var width = narrow ? 270 : 540 / Math.max(steps.length, 1);
        svg.setAttribute('viewBox', narrow ? '0 0 280 ' + (steps.length * 78 + 12) : '0 0 560 92');
        steps.forEach(function (step, n) {
          var x = narrow ? 10 : 10 + n * width;
          var y = narrow ? 12 + n * 78 : 12;
          svg.appendChild(LF.svgEl('rect', { x: x, y: y, width: width - 9, height: 66, rx: 3, fill: n === index ? 'var(--blueprint-tint-strong)' : 'var(--bg-surface)', stroke: n === index ? 'var(--blueprint)' : 'var(--rule-soft)' }));
          var text = LF.svgEl('text', { x: x + (width - 9) / 2, y: y + 23, 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 16, 'font-family': 'var(--font-mono)' });
          String(step.label).split(' ').reduce(function (lines, word) {
            if (!lines.length || (lines[lines.length - 1] + ' ' + word).length > Math.max(10, width / 10)) lines.push(word);
            else lines[lines.length - 1] += ' ' + word;
            return lines;
          }, []).slice(0, 3).forEach(function (line, i) {
            text.appendChild(LF.svgEl('tspan', { x: x + (width - 9) / 2, dy: i ? 14 : 0 }, [document.createTextNode(line)]));
          });
          svg.appendChild(text);
        });
        detail.textContent = steps[index] ? steps[index].detail : '';
        status.textContent = steps.length ? (index + 1) + ' / ' + steps.length : '';
        play.disabled = next.disabled = steps.length < 2;
        if (updateLab) updateLab();
      }
      function stop() { clearInterval(timer); timer = null; play.textContent = 'Play'; }
      function advance() { if (steps.length) index = (index + 1) % steps.length; draw(); }
      play.addEventListener('click', function () {
        if (timer) return stop();
        play.textContent = 'Pause';
        timer = setInterval(function () {
          if (!host.isConnected || document.hidden || reduced.matches) return stop();
          advance();
          if (index === steps.length - 1) stop();
        }, 1800);
      });
      next.addEventListener('click', function () { stop(); advance(); });
      var observer = new ResizeObserver(draw);
      observer.observe(host);
      draw();
      return function () { stop(); observer.disconnect(); };
    };
    window.LF.register(providers);
  }
  window.AIFSProjectFigures = { register: register, mountLab: function (host, config, step) {
    return lab(host, config, typeof step === 'function' ? step : function () { return 0; });
  } };
}());
