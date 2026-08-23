/* CMWIM. Progressive enhancement only: every page renders without this file.
   Motion timings adapted from Watermelon Platform (MIT). */
(function () {
  'use strict';
  var d = document;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile nav ---------------------------------------------------------- */
  var t = d.querySelector('.nav-toggle'), n = d.getElementById('nav');
  if (t && n) {
    t.addEventListener('click', function () {
      var open = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!open));
      n.classList.toggle('open', !open);
    });
    n.addEventListener('click', function (e) {
      if (e.target.closest('a')) { n.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && n.classList.contains('open')) {
        n.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.focus();
      }
    });
  }

  /* sticky header + spring-smoothed scroll progress ---------------------- */
  var head = d.querySelector('.site-head'), bar = d.getElementById('progress');
  var target = 0, current = 0, raf = null;
  function measure() {
    var max = d.body.scrollHeight - window.innerHeight;
    target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (head) head.classList.toggle('stuck', window.scrollY > 12);
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    current += (target - current) * 0.12;
    if (bar) bar.style.transform = 'scaleX(' + current.toFixed(4) + ')';
    if (Math.abs(target - current) > 0.0008) { raf = requestAnimationFrame(tick); } else { raf = null; }
  }
  measure();
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', measure);

  /* tagline highlight walks across Empower / Connect / Lead -------------- */
  var words = d.querySelectorAll('#tagline b');
  if (words.length) {
    if (reduced) {
      Array.prototype.forEach.call(words, function (w) { w.classList.add('lit'); });
    } else {
      var i = 0;
      words[0].classList.add('lit');
      setInterval(function () {
        words[i].classList.remove('lit');
        i = (i + 1) % words.length;
        words[i].classList.add('lit');
      }, 2000);
    }
  }

  /* team accordion. One bio open at a time, inside its own chapter row --- */
  Array.prototype.forEach.call(d.querySelectorAll('.roster'), function (group) {
    var panel = group.querySelector('.bio');
    if (!panel) return;
    var inner = panel.querySelector('.bio-in');
    var h3 = inner.querySelector('h3'), role = inner.querySelector('.role'), p = inner.querySelector('p');
    var closeBtn = inner.querySelector('.bio-close');
    var open = null;

    function shut() {
      if (!open) return;
      open.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
      open = null;
      window.setTimeout(function () { if (!open) panel.hidden = true; }, 500);
    }

    Array.prototype.forEach.call(group.querySelectorAll('.face'), function (btn) {
      btn.addEventListener('click', function () {
        if (open === btn) { shut(); return; }
        // close any bio open in another chapter
        Array.prototype.forEach.call(d.querySelectorAll('.face[aria-expanded="true"]'), function (o) {
          if (o !== btn) o.click();
        });
        if (open) open.setAttribute('aria-expanded', 'false');
        open = btn;
        btn.setAttribute('aria-expanded', 'true');
        h3.textContent = btn.dataset.name;
        role.textContent = btn.dataset.role + ' · ' + btn.dataset.meta;
        p.textContent = btn.dataset.bio;
        panel.hidden = false;
        requestAnimationFrame(function () { panel.classList.add('open'); });
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', function () {
      var was = open; shut(); if (was) was.focus();
    });
  });

  /* reveal on scroll ---------------------------------------------------- */
  var els = d.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(els, function (e) { e.classList.add('seen'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  Array.prototype.forEach.call(els, function (e) { io.observe(e); });
})();
