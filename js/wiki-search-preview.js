/**
 * wiki-search-preview.js
 * Live search preview dropdown — works on both sidebar and homepage.
 * Navigates to /wiki/search/?q=... on Enter/submit.
 * Keyboard: ArrowUp/Down to move through results, Escape to close.
 */
(function () {
  'use strict';

  var pages      = [];
  var MAX_ITEMS  = 6;
  var SEARCH_URL = '/wiki/search/';

  // Fetch index once (shared between all instances)
  fetch('/search.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { pages = data; })
    .catch(function () {});

  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function highlight(text, q) {
    if (!q || !text) return esc(text || '');
    var escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return esc(text).replace(
      new RegExp(escaped, 'gi'),
      function (m) { return '<mark>' + m + '</mark>'; }
    );
  }

  /* ── Bind a search preview to an input+preview pair ── */
  function initSearchPreview(input, preview) {
    if (!input || !preview) return;

    var activeIdx = -1;
    var debounceT = null;

    function runPreview(q) {
      activeIdx = -1;
      if (!q || q.length < 2) { close(); return; }

      var ql = q.toLowerCase();

      var scored = pages.map(function (p) {
        var score = 0;
        if (p.title && p.title.toLowerCase().includes(ql)) score += 3;
        if (p.description && p.description.toLowerCase().includes(ql)) score += 2;
        if (p.content && p.content.toLowerCase().includes(ql)) score += 1;
        return { p: p, score: score };
      }).filter(function (x) { return x.score > 0; });

      scored.sort(function (a, b) { return b.score - a.score; });
      var matched = scored.slice(0, MAX_ITEMS).map(function (x) { return x.p; });

      if (!matched.length) {
        preview.innerHTML = '<div class="sbp-empty">No results</div>';
        open();
        return;
      }

      preview.innerHTML = matched.map(function (p, i) {
        var cats = p.categories ? p.categories.split(',').map(function (c) { return c.trim(); }).filter(Boolean) : [];
        return '<a href="' + esc(p.url) + '" class="sbp-item" data-idx="' + i + '" role="option">' +
          '<span class="sbp-title">' + highlight(p.title || 'Untitled', q) + '</span>' +
          (p.description ? '<span class="sbp-desc">' + highlight(p.description, q) + '</span>' : '') +
          (cats.length ? '<span class="sbp-cat">' + esc(cats[0]) + '</span>' : '') +
          '</a>';
      }).join('');

      preview.innerHTML += '<a href="' + SEARCH_URL + '?q=' + encodeURIComponent(q) +
        '" class="sbp-all"><i class="fas fa-search"></i>See all results for "<strong>' + esc(q) + '</strong>"</a>';

      open();
    }

    function open() {
      preview.classList.add('open');
      input.setAttribute('aria-expanded', 'true');
    }

    function close() {
      preview.classList.remove('open');
      input.setAttribute('aria-expanded', 'false');
      activeIdx = -1;
    }

    function setActive(idx) {
      var items = preview.querySelectorAll('.sbp-item, .sbp-all');
      items.forEach(function (el) { el.classList.remove('sbp-active'); });
      activeIdx = idx;
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add('sbp-active');
        items[idx].scrollIntoView({ block: 'nearest' });
      }
    }

    input.addEventListener('input', function () {
      clearTimeout(debounceT);
      var q = input.value.trim();
      debounceT = setTimeout(function () { runPreview(q); }, 120);
    });

    input.addEventListener('keydown', function (e) {
      var items = preview.querySelectorAll('.sbp-item, .sbp-all');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, -1));
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && items[activeIdx]) {
          e.preventDefault();
          items[activeIdx].click();
        } else {
          var q = input.value.trim();
          if (q) window.location.href = '/wiki/search/?q=' + encodeURIComponent(q);
          e.preventDefault();
        }
      } else if (e.key === 'Escape') {
        close();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !preview.contains(e.target)) close();
    });

    // Close if sidebar closes on mobile
    var sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function () { close(); });
    }
  }

  /* ── Init: sidebar search ── */
  initSearchPreview(
    document.getElementById('sbSearchInput'),
    document.getElementById('sbSearchPreview')
  );

  /* ── Init: homepage banner search ── */
  initSearchPreview(
    document.getElementById('wikiSearch'),
    document.getElementById('homepageSearchPreview')
  );

}());
