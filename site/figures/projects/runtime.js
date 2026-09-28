(function () {
  'use strict';
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
        status.textContent = (index + 1) + ' / ' + steps.length;
      }
      function stop() { clearInterval(timer); timer = null; play.textContent = 'Play'; }
      function advance() { index = (index + 1) % steps.length; draw(); }
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
  window.AIFSProjectFigures = { register: register };
}());
