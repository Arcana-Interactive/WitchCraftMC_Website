/**
 * wiki-search-preview.js
 * Live search preview dropdown — works on both sidebar and homepage.
 * Navigates to /wiki/search/?q=... on Enter/submit, or straight to the
 * page when the search is exactly a page name (or one of its redirects).
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

  /* ── Redirects (other names for a page) ──
     Listed under "redirects:" in a page's front matter, e.g.
     Old Man Eyebrows → Fish Merchant. They are searched like the
     title, and the result says which name matched. */
  function redirectsOf(p) {
    var r = p.redirects || [];
    return typeof r === 'string' ? [r] : r;
  }

  // The redirect name that matches the search — exact match first
  function matchedRedirect(p, ql) {
    var names = redirectsOf(p);
    var i;
    for (i = 0; i < names.length; i++) {
      if (names[i].toLowerCase() === ql) return names[i];
    }
    for (i = 0; i < names.length; i++) {
      if (names[i].toLowerCase().includes(ql)) return names[i];
    }
    return null;
  }

  // Link to a result; tells the page which redirect name was used
  function resultUrl(p, via) {
    return via ? p.url + '?redirectedfrom=' + encodeURIComponent(via) : p.url;
  }

  // Page whose title or redirect is exactly the search, or null
  function exactMatch(ql) {
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (p.title && p.title.toLowerCase() === ql) return resultUrl(p, null);
      var via = matchedRedirect(p, ql);
      if (via && via.toLowerCase() === ql) return resultUrl(p, via);
    }
    return null;
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
        var title = (p.title || '').toLowerCase();
        // Only mention a redirect when the title itself doesn't match
        var via = title.includes(ql) ? null : matchedRedirect(p, ql);
        if (title.includes(ql) || via) score += 3;
        if (title === ql || (via && via.toLowerCase() === ql)) score += 4;  // exact name first
        if (p.description && p.description.toLowerCase().includes(ql)) score += 2;
        if (p.content && p.content.toLowerCase().includes(ql)) score += 1;
        return { p: p, via: via, score: score };
      }).filter(function (x) { return x.score > 0; });

      scored.sort(function (a, b) { return b.score - a.score; });
      var matched = scored.slice(0, MAX_ITEMS);

      if (!matched.length) {
        preview.innerHTML = '<div class="sbp-empty">No results</div>';
        open();
        return;
      }

      preview.innerHTML = matched.map(function (x, i) {
        var p = x.p;
        var cats = p.categories ? p.categories.split(',').map(function (c) { return c.trim(); }).filter(Boolean) : [];
        return '<a href="' + esc(resultUrl(p, x.via)) + '" class="sbp-item" data-idx="' + i + '" role="option">' +
          '<span class="sbp-title">' + highlight(p.title || 'Untitled', q) + '</span>' +
          (x.via ? '<span class="sbp-redirect"><i class="fas fa-share"></i>Redirected from ' + highlight(x.via, q) + '</span>' : '') +
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
          // An exact page name or redirect goes straight to the page
          var exact = q ? exactMatch(q.toLowerCase()) : null;
          if (exact) window.location.href = exact;
          else if (q) window.location.href = SEARCH_URL + '?q=' + encodeURIComponent(q);
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
