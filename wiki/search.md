---
layout: wiki-page
title: Search
description: "Search across all WitchCraftMC wiki pages."
permalink: /wiki/search/
categories: [Meta]
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

<script src="/js/wiki-search.js"></script>
