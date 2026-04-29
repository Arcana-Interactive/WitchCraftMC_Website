/**
 * mc-text.js — Parses Minecraft colour codes inside .mc-text elements
 * and expands inline placeholder shortcodes inside wiki article bodies
 * and infoboxes.
 *
 * All string transformation is delegated to /js/lib/placeholders.js so
 * the same logic can be exercised in Node tests; this file is the thin
 * DOM-walking glue that calls those helpers and swaps the rewritten
 * HTML back into the page.
 *
 * Inline placeholder shortcodes:
 *
 *   {tag_<name>}        — expands to a tag icon (see WIKI_TAGS).
 *                         Optional :shift offsets, e.g. {tag_legendary:-5}.
 *
 *   {item:<id>}         — expands to a full inventory slot for item <id>
 *   {<id>}              — same as {item:<id>}, but only when <id> matches
 *                         a known item ID in WIKI_ITEMS. Unknown braced
 *                         strings are left alone.
 *
 *   Examples (work in markdown bodies, infobox values, table cells):
 *       Use the {pyroclastic_pickaxe} to mine ore quickly.
 *       Trade a {item:vote_key} for rewards.
 *       {tag_legendary:-5} — places a tag icon shifted 5px left.
 *
 * Runs once on DOMContentLoaded. Idempotent — sets a data flag so
 * elements aren't double-parsed if other scripts re-render content.
 */
(function () {
  'use strict';

  // Pull every pure helper from the shared module. Loaded as a separate
  // <script> tag in the wiki layout, ahead of this file.
  var P = window.WikiPlaceholders;
  if (!P) {
    // Fail loud-but-graceful: log so the missing script tag is obvious
    // in devtools, then bail before we touch the DOM.
    if (window.console && console.error) {
      console.error('mc-text.js: window.WikiPlaceholders not found — ' +
                    'is /js/lib/placeholders.js loaded before this file?');
    }
    return;
  }

  /**
   * Walk text nodes inside `root` and apply transformations to each.
   * Skips nodes inside elements that already carry data-minetip-text
   * (those are tooltips and handled separately by minetip.js).
   */
  function processTextNodes(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        // Skip script/style/already-tooltip contexts
        while (p && p !== root) {
          var tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') {
            return NodeFilter.FILTER_REJECT;
          }
          if (p.hasAttribute && p.hasAttribute('data-minetip-text')) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentElement;
        }
        var t = node.nodeValue;
        if (!t) return NodeFilter.FILTER_REJECT;
        // Quick reject for text that obviously contains no placeholder.
        // The bare {xxx} form is identified by *any* "{" in the text —
        // expandShortItemPlaceholders does its own item-id whitelist
        // so unrelated braces are no-ops.
        if (
          t.indexOf('{item:') === -1 &&
          t.indexOf('{tag_') === -1 &&
          t.indexOf('{')      === -1
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var batch = [];
    var n;
    while ((n = walker.nextNode())) batch.push(n);

    batch.forEach(function (node) {
      var html = P.esc(node.nodeValue);
      // Order matters: the explicit item: prefix consumes its own
      // braces first, then tag_ tokens, and finally the bare {id}
      // alias only matches what's left over.
      html = P.expandAll(html, window.WIKI_ITEMS, window.WIKI_TAGS);
      // Re-decode the angle brackets we escaped above so legitimate
      // characters round-trip; { and } weren't touched.
      var span = document.createElement('span');
      span.className = 'mc-inline';
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    });
  }

  function processColorCodeElements(root) {
    if (!root) return;
    var nodes = root.querySelectorAll('.mc-text');
    nodes.forEach(function (el) {
      if (el.dataset.mcParsed === '1') return;
      var html = el.innerHTML;
      // Allow {item:...}, {tag_...}, and the bare {<id>} alias inside
      // .mc-text too. Same ordering as processTextNodes — explicit
      // prefixes resolve first so they always win the race.
      html = P.expandAll(html, window.WIKI_ITEMS, window.WIKI_TAGS);
      // Now apply colour codes. We don't double-escape — assume the
      // input is plain text + simple HTML emitted by Liquid.
      el.innerHTML = P.parseCodes(html);
      el.dataset.mcParsed = '1';
    });
  }

  function run() {
    var article = document.querySelector('.wiki-content');
    var infobox = document.querySelector('.infobox');

    if (article) {
      processTextNodes(article);
      processColorCodeElements(article);
    }
    if (infobox) {
      processTextNodes(infobox);
      processColorCodeElements(infobox);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}());
