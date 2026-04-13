---
layout: wiki-page
title: Categories
description: "Browse all wiki articles organised by category."
permalink: /wiki/categories/
categories: [Reference]
see_also:
  - title: Wiki Home
    url: /wiki/
  - title: Changelog
    url: /wiki/changelog/
---

<p id="catIntro">All wiki pages grouped by topic. Click any article to jump straight to it, or use the sidebar search to find something specific.</p>

<p id="catFiltered" style="display:none">
  Showing category: <strong id="catFilterName"></strong>
  <a href="/wiki/categories/" style="margin-left:.75rem;font-size:.82rem;color:var(--teal)"><i class="fas fa-xmark" style="margin-right:.25rem"></i>Show all</a>
</p>

---

{% comment %}
  Auto-generated category index.
  Collects every page using layout "wiki-page", reads its categories array,
  and groups them alphabetically. No manual maintenance needed — just add
  categories: [Foo, Bar] to any page's frontmatter.
{% endcomment %}

{% assign wiki_pages = site.pages | where: "layout", "wiki-page" %}

{% comment %} Build a flat, deduplicated list of every category in use {% endcomment %}
{% assign all_cats = "" %}
{% for p in wiki_pages %}
  {% if p.categories %}
    {% for cat in p.categories %}
      {% assign all_cats = all_cats | append: "|||" | append: cat %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign all_cats = all_cats | split: "|||" | uniq | sort %}

{% comment %} Render each category as its own section {% endcomment %}
{% for cat in all_cats %}
  {% if cat == "" %}{% continue %}{% endif %}

  {% assign cat_slug = cat | downcase | replace: " ", "-" %}

<div class="cat-section" data-cat="{{ cat_slug }}">
<h2 id="{{ cat_slug }}"><i class="fas fa-tag" style="color:var(--gold);margin-right:.5rem"></i>{{ cat }}</h2>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.75rem;margin:1rem 0 1.5rem">
  {% for p in wiki_pages %}
    {% if p.categories contains cat %}
      {% unless p.url == page.url %}
  <a href="{{ p.url | relative_url }}" class="see-also-link" style="display:flex;flex-direction:column;gap:.3rem;padding:.85rem 1rem;align-items:flex-start">
    <span style="font-weight:700;color:#fff">{{ p.title }}</span>
    {% if p.description %}<span style="font-size:.78rem;color:var(--text-muted)">{{ p.description }}</span>{% endif %}
  </a>
      {% endunless %}
    {% endif %}
  {% endfor %}
</div>
</div>

{% endfor %}

<script>
(function() {
  var sections = document.querySelectorAll('.cat-section');
  var intro    = document.getElementById('catIntro');
  var filtered = document.getElementById('catFiltered');
  var filterName = document.getElementById('catFilterName');
  var hrs = document.querySelectorAll('.wiki-content hr');

  function applyFilter() {
    var hash = window.location.hash.replace('#', '').toLowerCase();
    if (!hash) {
      // Show all
      sections.forEach(function(s) { s.style.display = ''; });
      hrs.forEach(function(h) { h.style.display = ''; });
      intro.style.display = '';
      filtered.style.display = 'none';
      return;
    }
    // Filter to matching category
    var found = false;
    sections.forEach(function(s) {
      if (s.dataset.cat === hash) {
        s.style.display = '';
        found = true;
        filterName.textContent = s.querySelector('h2').textContent.trim();
      } else {
        s.style.display = 'none';
      }
    });
    hrs.forEach(function(h) { h.style.display = 'none'; });
    if (found) {
      intro.style.display = 'none';
      filtered.style.display = '';
    }
  }

  applyFilter();
  window.addEventListener('hashchange', applyFilter);
})();
</script>
