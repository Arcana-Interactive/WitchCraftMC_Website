/**
 * placeholders.js — Pure helpers for inline shortcodes & MC colour codes.
 *
 * This file holds every string transformation used by mc-text.js, peeled
 * out of the IIFE so each function can be tested in isolation under Node.
 *
 * In the browser it attaches itself to `window.WikiPlaceholders`; in Node
 * it exports the same object via `module.exports`. mc-text.js is the only
 * production consumer — it walks DOM text nodes and feeds them through
 * these helpers.
 *
 * Public API
 * ──────────
 *   esc(text)                            — Escape <, >, & for raw text → HTML
 *   attrEsc(s)                           — Escape a string for use in attrs
 *   parseCodes(html)                     — Expand &7/&6/&#rrggbb codes
 *   buildItemTip(item)                   — Compose tooltip + tag suffix
 *   buildItemSlotHTML(id, items)         — Full inv-slot HTML for one item
 *   expandItemPlaceholders(html, items)  — `{item:xxx}` → slot HTML
 *   expandTagPlaceholders(html, tags)    — `{tag_xxx[:shift]}` → <img>
 *   expandShortItemPlaceholders(html, items)
 *                                        — Bare `{xxx}` → slot HTML when
 *                                          xxx is a known item id; safely
 *                                          ignores `{dropdown}` and unknown
 *                                          identifiers.
 *   expandAll(html, items, tags)         — Convenience: runs the three
 *                                          expanders in the correct order.
 *
 * Order matters
 * ─────────────
 *   1. expandItemPlaceholders   — `{item:…}` consumes its own braces first
 *   2. expandTagPlaceholders    — `{tag_…}` rewrites to <img>, removing braces
 *   3. expandShortItemPlaceholders — bare `{id}` only sees what's left
 *
 *   Running them out of order would let the bare-id matcher swallow tag
 *   tokens before the tag expander could see them.
 */
(function (root, factory) {
  if (typeof module === 'object' && module && module.exports) {
    module.exports = factory();
  } else {
    root.WikiPlaceholders = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ── HTML escaping ────────────────────────────────────────────────

  var ESC = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };

  /**
   * Escape raw text for safe insertion as HTML.
   *
   * Mirrors minetip.js exactly:
   *   · `\\` (literal backslash-backslash) → `&#92;`
   *   · `\&` (escaped ampersand)           → `&#38;`
   *   · `<` and `>`                        → numeric entities
   *
   * Bare `&` characters are deliberately left alone so colour codes
   * like `&7` pass through untouched and can be picked up later by
   * parseCodes. Curly braces are also untouched so the placeholder
   * expanders can still see and rewrite them downstream.
   */
  function esc(t) {
    return String(t)
      .replace(/\\\\/g, '&#92;')
      .replace(/\\&|[<>]/g, function (c) { return ESC[c]; });
  }

  /**
   * Escape a string for safe use inside a double-quoted HTML attribute.
   * Used when stitching item names, tooltips, and links into slot HTML.
   */
  function attrEsc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── Minecraft colour-code parser ─────────────────────────────────

  /**
   * Convert in-line MC colour codes to nested <span> tags.
   *
   *   &7 hello &r          →  <span class="format-7">hello </span>
   *   &#ff00ff bright       →  <span style="color:#ff00ff">bright</span>
   *   &$f0a teal            →  <span style="color:#f0a">teal</span>
   *
   * The loop runs until no recognisable code remains, capped at 30
   * passes to defend against pathological input. A trailing `&r` is
   * inserted then stripped so each span gets cleanly terminated.
   *
   * Liquid + kramdown HTML-encodes `&` to `&amp;` when stat-table
   * descriptions and other Liquid-emitted bodies pass through the
   * markdown pipeline. Without normalising first, `&amp;7Fortune V`
   * matches `&a` (green) and the text "mp;7Fortune V" leaks through.
   * Decoding the entity here keeps `&7` codes working regardless of
   * which pipeline produced the HTML.
   */
  function parseCodes(html) {
    html = String(html).replace(/&amp;/g, '&');
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

  // ── Item-slot rendering ──────────────────────────────────────────

  /**
   * Build the tooltip text shown by minetip.js when hovering an item
   * placeholder. Matches the format produced by item-slot.html so
   * inline placeholders look identical to slots rendered by Liquid.
   */
  function buildItemTip(item) {
    var tip = item.tooltip || '';
    if (item.tags && item.tags.length) {
      for (var i = 0; i < item.tags.length; i++) {
        tip = tip ? tip + '/' + item.tags[i] : item.tags[i];
      }
    }
    return tip;
  }

  /**
   * Render the full HTML for an inline inventory slot.
   *
   * Returns null when the requested id isn't in the registry, which
   * is the signal callers use to leave the original braced text
   * untouched.
   *
   *   id     — string item id from the WIKI_ITEMS registry
   *   items  — the registry object (caller passes window.WIKI_ITEMS)
   */
  function buildItemSlotHTML(id, items) {
    if (!items) return null;
    var item = items[id];
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

  // ── Placeholder expanders ────────────────────────────────────────

  /**
   * Replace every `{item:<id>}` token with its slot HTML. Unknown ids
   * round-trip back through the original match string, leaving them
   * visible in the rendered page so authors notice typos.
   */
  function expandItemPlaceholders(html, items) {
    return html.replace(/\{item:([a-zA-Z0-9_]+)\}/g, function (m, id) {
      var slot = buildItemSlotHTML(id, items);
      return slot || m;
    });
  }

  /**
   * Replace `{tag_<key>}` (and `{tag_<key>:-5}` for a horizontal shift)
   * with the corresponding tag <img>. Unknown keys are left literal so
   * authors can notice the typo on the rendered page.
   */
  function expandTagPlaceholders(html, tags) {
    if (!tags) return html;
    return html.replace(/\{tag_([a-zA-Z0-9_]+)(?::(-?[0-9.]+))?\}/g, function (m, key, shift) {
      var src = tags[key];
      if (!src) return m;
      var style = shift ? ' style="margin-left:' + shift + 'px"' : '';
      return '<img src="' + src + '" alt="' + key + '" class="wiki-tag-icon"' + style + '>';
    });
  }

  /**
   * Bare-id alias: turn `{pyroclastic_pickaxe}` into the same slot HTML
   * as `{item:pyroclastic_pickaxe}`. Only fires when the braced string
   * is a known item ID — anything else (e.g. `{dropdown}`, arbitrary
   * placeholders, snippets of code) is left untouched so we never
   * accidentally rewrite something the author meant literally.
   *
   * MUST run AFTER expandTagPlaceholders so `{tag_xxx}` matches its
   * own pattern first; by that point the curly braces around tag
   * tokens have already been replaced with <img> tags.
   */
  function expandShortItemPlaceholders(html, items) {
    if (!items) return html;
    return html.replace(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g, function (m, id) {
      // Skip pseudo-markers handled elsewhere (the dropdown script
      // runs before us, but be defensive in case ordering ever
      // changes — these strings should never become item slots).
      if (id === 'dropdown') return m;
      var slot = buildItemSlotHTML(id, items);
      return slot || m;
    });
  }

  /**
   * Convenience pipeline. Equivalent to:
   *   expandShortItemPlaceholders(
   *     expandTagPlaceholders(
   *       expandItemPlaceholders(html, items),
   *       tags),
   *     items)
   */
  function expandAll(html, items, tags) {
    html = expandItemPlaceholders(html, items);
    html = expandTagPlaceholders(html, tags);
    html = expandShortItemPlaceholders(html, items);
    return html;
  }

  return {
    esc: esc,
    attrEsc: attrEsc,
    parseCodes: parseCodes,
    buildItemTip: buildItemTip,
    buildItemSlotHTML: buildItemSlotHTML,
    expandItemPlaceholders: expandItemPlaceholders,
    expandTagPlaceholders: expandTagPlaceholders,
    expandShortItemPlaceholders: expandShortItemPlaceholders,
    expandAll: expandAll
  };
}));
