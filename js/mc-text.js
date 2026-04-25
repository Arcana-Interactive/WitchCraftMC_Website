/**
 * mc-text.js — Parses Minecraft colour codes inside .mc-text elements.
 *
 * Uses the same parseCodes logic as minetip.js so colours look identical
 * in tooltips and inline text. Also supports {tag_xxx} placeholders the
 * way tooltips do, and {item:xxx} placeholders that expand to full
 * inventory slots (see WIKI_ITEMS).
 *
 * Runs once on DOMContentLoaded. Idempotent — sets a data flag so
 * elements aren't double-parsed if other scripts re-render content.
 */
(function () {
  'use strict';

  var ESC = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };

  function esc(t) {
    return t
      .replace(/\\\\/g, '&#92;')
      .replace(/\\&|[<>]/g, function (c) { return ESC[c]; });
  }

  function parseCodes(html) {
    var n = 0;
    while (
      /&(?:[0-9a-jl-qs-vyz]|#[0-9a-fA-F]{6}|\$[0-9a-fA-F]{3})/.test(html)
      && n++ < 30
    ) {
      html = html
        .replace(
          /&([0-9a-jl-qs-vyz])([\s\S]*?)(&r|$)/g,
          '<span class="format-$1">$2</span>&r'
        )
        .replace(
          /&(?:#([0-9a-fA-F]{6})|\$([0-9a-fA-F]{3}))([\s\S]*?)(&r|$)/g,
          '<span style="color:#$1$2">$3</span>&r'
        );
    }
    return html.replace(/&r/g, '');
  }

  function expandTagPlaceholders(html) {
    if (!window.WIKI_TAGS) return html;
    return html.replace(/\{tag_([a-zA-Z0-9_]+)(?::(-?[0-9.]+))?\}/g, function (m, key, shift) {
      var src = window.WIKI_TAGS[key];
      if (!src) return m;
      var style = shift ? ' style="margin-left:' + shift + 'px"' : '';
      return '<img src="' + src + '" alt="' + key + '" class="wiki-tag-icon"' + style + '>';
    });
  }

  function buildItemTip(item) {
    var tip = item.tooltip || '';
    if (item.tags && item.tags.length) {
      for (var i = 0; i < item.tags.length; i++) {
        tip = tip ? tip + '/' + item.tags[i] : item.tags[i];
      }
    }
    return tip;
  }

  function attrEsc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function buildItemSlotHTML(id) {
    if (!window.WIKI_ITEMS) return null;
    var item = window.WIKI_ITEMS[id];
    if (!item) return null;
    var tip = buildItemTip(item);
    var altText = (item.name || id).replace(/&[0-9a-fA-Fk-orK-OR]/g, '');
    var img = item.img
      ? '<img src="' + attrEsc(item.img) + '" alt="' + attrEsc(altText) + '">'
      : '';
    var attrs =
      ' title="' + attrEsc(item.name || id) + '"' +
      ' data-minetip-text="' + attrEsc(tip) + '"';
    if (item.link) {
      return '<span class="invslot inline-invslot">' +
             '<a href="' + attrEsc(item.link) + '" class="invslot-item invslot-link"' + attrs + '>' +
             img + '</a></span>';
    }
    return '<span class="invslot inline-invslot">' +
           '<span class="invslot-item"' + attrs + '>' +
           img + '</span></span>';
  }

  function expandItemPlaceholders(html) {
    return html.replace(/\{item:([a-zA-Z0-9_]+)\}/g, function (m, id) {
      var slot = buildItemSlotHTML(id);
      return slot || m;
    });
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
        if (t.indexOf('{item:') === -1 && t.indexOf('{tag_') === -1) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var batch = [];
    var n;
    while ((n = walker.nextNode())) batch.push(n);

    batch.forEach(function (node) {
      var html = esc(node.nodeValue);
      html = expandItemPlaceholders(html);
      html = expandTagPlaceholders(html);
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
      // Allow {item:...} and {tag_...} inside .mc-text too
      html = expandItemPlaceholders(html);
      html = expandTagPlaceholders(html);
      // Now apply colour codes. We don't double-escape — assume the
      // input is plain text + simple HTML emitted by Liquid.
      el.innerHTML = parseCodes(html);
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
