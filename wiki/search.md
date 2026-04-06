---
layout: wiki-page
title: Search
description: "Search across all WitchCraftMC wiki pages."
permalink: /wiki/search/
categories: [Reference]
see_also:
  - title: Wiki Home
    url: /wiki/
  - title: Categories
    url: /wiki/categories/
---

<div id="search-ui">

  <div style="position:relative;margin-bottom:1.5rem">
    <i class="fas fa-search" style="position:absolute;left:.9rem;top:50%;transform:translateY(-50%);color:var(--text-dim);font-size:.9rem;pointer-events:none"></i>
    <input
      type="text"
      id="search-input"
      placeholder="Type to search all wiki pages…"
      autocomplete="off"
      spellcheck="false"
      style="width:100%;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-family:var(--font-body);font-size:1rem;padding:.8rem 1rem .8rem 2.6rem;outline:none;transition:border-color .2s,box-shadow .2s"
    >
  </div>

  <div id="search-status" style="font-size:.82rem;color:var(--text-dim);margin-bottom:1.25rem"></div>

  <div id="search-results"></div>

</div>

<style>
  #search-input:focus{border-color:var(--violet)!important;box-shadow:0 0 0 3px rgba(109,79,194,.2)!important}
  .sr-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.1rem 1.25rem;margin-bottom:.75rem;transition:border-color .15s,background .15s;text-decoration:none!important}
  .sr-card:hover{border-color:rgba(74,184,184,.4);background:var(--surface-2);text-decoration:none!important}
  .sr-title{font-family:var(--font-title);font-size:1rem;font-weight:700;color:#fff;margin-bottom:.3rem}
  .sr-desc{font-size:.83rem;color:var(--text-muted);line-height:1.55;margin-bottom:.45rem}
  .sr-snippet{font-size:.8rem;color:var(--text-dim);line-height:1.55;border-left:2px solid var(--border);padding-left:.75rem;margin-bottom:.45rem}
  .sr-meta{display:flex;align-items:center;gap:.75rem;font-size:.72rem;color:var(--text-dim)}
  .sr-cat{background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:.1rem .55rem}
  .sr-url{font-family:var(--font-mono)}
  mark{background:rgba(201,162,39,.25);color:var(--gold-bright);border-radius:2px;padding:0 .15em}
  .no-results{text-align:center;padding:3rem 1rem;color:var(--text-muted)}
  .no-results i{font-size:2rem;display:block;margin-bottom:.75rem;color:var(--text-dim)}
</style>

<script>
(function(){
  const input   = document.getElementById('search-input');
  const status  = document.getElementById('search-status');
  const results = document.getElementById('search-results');

  // Read ?q= from URL
  const params = new URLSearchParams(window.location.search);
  const initialQ = params.get('q') || '';

  let pages = [];

  // Fetch the search index
  fetch('/search.json')
    .then(r => r.json())
    .then(data => {
      pages = data;
      if (initialQ) {
        input.value = initialQ;
        runSearch(initialQ);
      } else {
        status.textContent = pages.length + ' pages indexed — start typing to search.';
      }
    })
    .catch(() => {
      status.textContent = 'Search index unavailable.';
    });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    // Update URL without reload
    const url = new URL(window.location);
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    runSearch(q);
  });

  function highlight(text, q) {
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(escaped, 'gi'), m => `<mark>${m}</mark>`);
  }

  function snippet(content, q) {
    if (!content || !q) return '';
    const idx = content.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return '';
    const start = Math.max(0, idx - 80);
    const end   = Math.min(content.length, idx + 160);
    let s = (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
    return highlight(s, q);
  }

  function runSearch(q) {
    if (!q) {
      results.innerHTML = '';
      status.textContent = pages.length + ' pages indexed — start typing to search.';
      return;
    }
    const ql = q.toLowerCase();
    const matched = pages.filter(p => {
      return (p.title && p.title.toLowerCase().includes(ql)) ||
             (p.description && p.description.toLowerCase().includes(ql)) ||
             (p.categories && p.categories.toLowerCase().includes(ql)) ||
             (p.content && p.content.toLowerCase().includes(ql));
    });

    status.textContent = matched.length
      ? matched.length + ' result' + (matched.length > 1 ? 's' : '') + ' for "' + q + '"'
      : '';

    if (!matched.length) {
      results.innerHTML = `<div class="no-results"><i class="fas fa-magnifying-glass"></i>No results for <strong>"${q}"</strong><br><span style="font-size:.83rem;margin-top:.5rem;display:block">Try a different keyword, or <a href="/wiki/categories/">browse by category</a>.</span></div>`;
      return;
    }

    results.innerHTML = matched.map(p => {
      const snip = snippet(p.content, q);
      const cats = p.categories ? p.categories.split(',').map(c => c.trim()).filter(Boolean) : [];
      return `<a href="${p.url}" class="sr-card">
        <div class="sr-title">${highlight(p.title || 'Untitled', q)}</div>
        ${p.description ? `<div class="sr-desc">${highlight(p.description, q)}</div>` : ''}
        ${snip ? `<div class="sr-snippet">${snip}</div>` : ''}
        <div class="sr-meta">
          ${cats.map(c => `<span class="sr-cat"><i class="fas fa-tag" style="margin-right:.25rem;font-size:.6rem"></i>${c}</span>`).join('')}
          <span class="sr-url">${p.url}</span>
        </div>
      </a>`;
    }).join('');
  }
})();
</script>
