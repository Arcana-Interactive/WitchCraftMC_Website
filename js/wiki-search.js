/**
 * wiki-search.js
 * Full-page search for /wiki/search/.
 * Title matches are prioritised over description > categories > content.
 * A page's redirects (other names, see "redirects:" in its front matter)
 * count the same as its title.
 */
(function () {
  'use strict';

  var input   = document.getElementById('search-input');
  var status  = document.getElementById('search-status');
  var results = document.getElementById('search-results');
  if (!input || !status || !results) return;

  // Read ?q= from URL
  var params   = new URLSearchParams(window.location.search);
  var initialQ = params.get('q') || '';

  var pages = [];

  fetch('/search.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      pages = data;
      if (initialQ) {
        input.value = initialQ;
        runSearch(initialQ);
      } else {
        status.textContent = pages.length + ' pages indexed — start typing to search.';
      }
    })
    .catch(function () {
      status.textContent = 'Search index unavailable.';
    });

  input.addEventListener('input', function () {
    var q = input.value.trim();
    var url = new URL(window.location);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    runSearch(q);
  });

  function highlight(text, q) {
    if (!q || !text) return text || '';
    var escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(escaped, 'gi'), function (m) { return '<mark>' + m + '</mark>'; });
  }

  function snippet(content, q) {
    if (!content || !q) return '';
    var idx = content.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return '';
    var start = Math.max(0, idx - 80);
    var end   = Math.min(content.length, idx + 160);
    var s = (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
    return highlight(s, q);
  }

  // Redirect name that matches the search — exact match first
  function matchedRedirect(p, ql) {
    var names = p.redirects || [];
    if (typeof names === 'string') names = [names];
    var i;
    for (i = 0; i < names.length; i++) {
      if (names[i].toLowerCase() === ql) return names[i];
    }
    for (i = 0; i < names.length; i++) {
      if (names[i].toLowerCase().includes(ql)) return names[i];
    }
    return null;
  }

  function score(p, ql, via) {
    var s = 0;
    // A matching redirect scores like the title
    var name = via ? via.toLowerCase() : (p.title || '').toLowerCase();
    if (name.includes(ql))                                          s += 10;
    if (p.description && p.description.toLowerCase().includes(ql)) s += 4;
    if (p.categories  && p.categories.toLowerCase().includes(ql))  s += 3;
    if (p.content     && p.content.toLowerCase().includes(ql))     s += 1;
    // Exact title match bonus
    if (name === ql) s += 20;
    // Title starts with query bonus
    if (name.startsWith(ql)) s += 5;
    return s;
  }

  function runSearch(q) {
    if (!q) {
      results.innerHTML = '';
      status.textContent = pages.length + ' pages indexed — start typing to search.';
      return;
    }
    var ql = q.toLowerCase();

    var matched = pages
      .map(function (p) {
        // Only mention a redirect when the title itself doesn't match
        var via = (p.title || '').toLowerCase().includes(ql) ? null : matchedRedirect(p, ql);
        return { p: p, via: via, s: score(p, ql, via) };
      })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });

    status.textContent = matched.length
      ? matched.length + ' result' + (matched.length > 1 ? 's' : '') + ' for "' + q + '"'
      : '';

    if (!matched.length) {
      results.innerHTML =
        '<div class="no-results"><i class="fas fa-magnifying-glass"></i>No results for <strong>"' + q + '"</strong>' +
        '<br><span style="font-size:.83rem;margin-top:.5rem;display:block">Try a different keyword, or <a href="/wiki/categories/">browse by category</a>.</span></div>';
      return;
    }

    results.innerHTML = matched.map(function (x) {
      var p = x.p;
      var snip = snippet(p.content, q);
      var cats = p.categories ? p.categories.split(',').map(function (c) { return c.trim(); }).filter(Boolean) : [];
      var href = x.via ? p.url + '?redirectedfrom=' + encodeURIComponent(x.via) : p.url;
      return '<a href="' + href + '" class="sr-card">' +
        '<div class="sr-title">' + highlight(p.title || 'Untitled', q) + '</div>' +
        (x.via ? '<div class="sr-redirect"><i class="fas fa-share"></i>Redirected from ' + highlight(x.via, q) + '</div>' : '') +
        (p.description ? '<div class="sr-desc">' + highlight(p.description, q) + '</div>' : '') +
        (snip ? '<div class="sr-snippet">' + snip + '</div>' : '') +
        '<div class="sr-meta">' +
          cats.map(function (c) {
            return '<span class="sr-cat"><i class="fas fa-tag" style="margin-right:.25rem;font-size:.6rem"></i>' + c + '</span>';
          }).join('') +
          '<span class="sr-url">' + p.url + '</span>' +
        '</div>' +
        '</a>';
    }).join('');
  }
}());
