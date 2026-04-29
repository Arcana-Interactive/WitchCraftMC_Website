/**
 * placeholders.test.js — Pure-Node tests for /js/lib/placeholders.js.
 *
 * Run with:
 *     node tests/placeholders.test.js
 *
 * No test framework — just a tiny `assertEq` that prints OK/FAIL lines
 * and returns a non-zero exit code on the first failure. The goal is
 * a sub-second sanity check that every future placeholder change can
 * run before commit, even when a full Jekyll build isn't available.
 *
 * Coverage matrix:
 *   · esc                         — angle brackets, escaped &, raw & passthrough
 *   · attrEsc                     — quotes, ampersands, brackets in attrs
 *   · parseCodes                  — &7 / &#rrggbb / &$rgb codes
 *   · buildItemTip                — tooltip + tag concatenation
 *   · buildItemSlotHTML           — link vs no-link variants, missing img
 *   · expandItemPlaceholders      — known + unknown {item:xxx}
 *   · expandTagPlaceholders       — known, unknown, with shift, without shift
 *   · expandShortItemPlaceholders — known item, unknown id, {dropdown}
 *                                   pseudo-marker, numeric, empty braces
 *   · expandAll pipeline order    — explicit > tag > bare matchers
 */
'use strict';

var P = require('../js/lib/placeholders.js');

// ── Fixtures ───────────────────────────────────────────────────────

var ITEMS = {
  pyroclastic_pickaxe: {
    name: '&6Pyroclastic Pickaxe',
    img:  '/img/items/pp.png',
    link: '/wiki/pyroclastic/',
    tooltip: 'A blazing pickaxe.',
    tags: ['legendary']
  },
  vote_key: {
    name: 'Vote Key',
    img:  '/img/items/vk.png',
    tooltip: 'Trade for rewards.',
    tags: []
  },
  no_img_item: {
    name: 'Mystery',
    tooltip: '',
    tags: []
  }
};

var TAGS = {
  legendary: '/img/tags/legendary.png',
  mythic:    '/img/tags/mythic.png'
};

// ── Tiny test runner ───────────────────────────────────────────────

var passed = 0, failed = 0;

function assertEq(label, got, want) {
  var ok = got === want;
  if (ok) {
    passed++;
    console.log('OK   | ' + label);
  } else {
    failed++;
    console.log('FAIL | ' + label);
    console.log('     got:  ' + JSON.stringify(got));
    console.log('     want: ' + JSON.stringify(want));
  }
}

function assertContains(label, haystack, needle) {
  var ok = typeof haystack === 'string' && haystack.indexOf(needle) !== -1;
  if (ok) {
    passed++;
    console.log('OK   | ' + label);
  } else {
    failed++;
    console.log('FAIL | ' + label);
    console.log('     in:    ' + JSON.stringify(haystack));
    console.log('     missing: ' + JSON.stringify(needle));
  }
}

// ── esc ────────────────────────────────────────────────────────────

console.log('\n── esc ──');
assertEq('escapes <',  P.esc('a<b'),  'a&#60;b');
assertEq('escapes >',  P.esc('a>b'),  'a&#62;b');
assertEq('escapes \\&', P.esc('a\\&7'), 'a&#38;7');
assertEq('escapes \\\\', P.esc('a\\\\b'), 'a&#92;b');
assertEq('passes through bare &', P.esc('hello &7world'), 'hello &7world');
assertEq('passes through { and }', P.esc('use {pyro} now'), 'use {pyro} now');
assertEq('coerces non-strings',  P.esc(42), '42');

// ── attrEsc ────────────────────────────────────────────────────────

console.log('\n── attrEsc ──');
assertEq('escapes &',  P.attrEsc('a&b'),  'a&amp;b');
assertEq('escapes "',  P.attrEsc('a"b'),  'a&quot;b');
assertEq('escapes <',  P.attrEsc('a<b'),  'a&lt;b');
assertEq('escapes >',  P.attrEsc('a>b'),  'a&gt;b');
assertEq('coerces non-strings', P.attrEsc(7), '7');

// ── parseCodes ─────────────────────────────────────────────────────

console.log('\n── parseCodes ──');
assertEq(
  'simple &7 wraps in span',
  P.parseCodes('&7grey'),
  '<span class="format-7">grey</span>'
);
assertEq(
  '&r terminates a span',
  P.parseCodes('&7grey&rback'),
  '<span class="format-7">grey</span>back'
);
assertContains(
  'hex code &#ff00ff renders inline style',
  P.parseCodes('&#ff00ffhot pink'),
  'style="color:#ff00ff"'
);
assertContains(
  'short hex &$f0a renders inline style',
  P.parseCodes('&$f0aterse'),
  'style="color:#f0a"'
);
assertEq(
  'no codes round-trip cleanly',
  P.parseCodes('plain text'),
  'plain text'
);

// ── buildItemTip ───────────────────────────────────────────────────

console.log('\n── buildItemTip ──');
assertEq(
  'tooltip + one tag',
  P.buildItemTip(ITEMS.pyroclastic_pickaxe),
  'A blazing pickaxe./legendary'
);
assertEq(
  'tooltip with no tags',
  P.buildItemTip({ tooltip: 'Hello', tags: [] }),
  'Hello'
);
assertEq(
  'tags with no tooltip',
  P.buildItemTip({ tooltip: '', tags: ['rare', 'shiny'] }),
  'rare/shiny'
);
assertEq(
  'no tooltip, no tags',
  P.buildItemTip({}),
  ''
);

// ── buildItemSlotHTML ──────────────────────────────────────────────

console.log('\n── buildItemSlotHTML ──');
assertEq(
  'unknown id returns null',
  P.buildItemSlotHTML('does_not_exist', ITEMS),
  null
);
assertEq(
  'missing items registry returns null',
  P.buildItemSlotHTML('vote_key', null),
  null
);
var pickaxeHTML = P.buildItemSlotHTML('pyroclastic_pickaxe', ITEMS);
assertContains('linked slot uses <a>',                pickaxeHTML, '<a href="/wiki/pyroclastic/"');
assertContains('linked slot has invslot wrapper',     pickaxeHTML, 'class="invslot inline-invslot"');
assertContains('linked slot has minetip data attr',   pickaxeHTML, 'data-minetip-text="A blazing pickaxe./legendary"');
assertContains('linked slot has image',               pickaxeHTML, '<img src="/img/items/pp.png"');
assertContains('alt text strips colour codes',        pickaxeHTML, 'alt="Pyroclastic Pickaxe"');
var voteKeyHTML = P.buildItemSlotHTML('vote_key', ITEMS);
assertContains('non-linked slot uses inner <span>',   voteKeyHTML, 'class="invslot-item"');
assertEq(
  'non-linked slot has no <a>',
  voteKeyHTML.indexOf('<a '),
  -1
);
var noImgHTML = P.buildItemSlotHTML('no_img_item', ITEMS);
assertEq(
  'item without img produces no <img>',
  noImgHTML.indexOf('<img'),
  -1
);

// ── expandItemPlaceholders ─────────────────────────────────────────

console.log('\n── expandItemPlaceholders ──');
assertContains(
  'known {item:vote_key} expands to slot',
  P.expandItemPlaceholders('Trade {item:vote_key} now.', ITEMS),
  'class="invslot inline-invslot"'
);
assertEq(
  'unknown {item:fake} round-trips literal',
  P.expandItemPlaceholders('Trade {item:fake} now.', ITEMS),
  'Trade {item:fake} now.'
);
assertEq(
  'no placeholder is a no-op',
  P.expandItemPlaceholders('plain text', ITEMS),
  'plain text'
);

// ── expandTagPlaceholders ──────────────────────────────────────────

console.log('\n── expandTagPlaceholders ──');
assertContains(
  '{tag_legendary} renders <img>',
  P.expandTagPlaceholders('Tag: {tag_legendary}.', TAGS),
  '<img src="/img/tags/legendary.png"'
);
assertContains(
  '{tag_legendary:-5} adds margin-left style',
  P.expandTagPlaceholders('shifted {tag_legendary:-5}', TAGS),
  'style="margin-left:-5px"'
);
assertEq(
  'unknown tag round-trips literal',
  P.expandTagPlaceholders('plain {tag_unknown} text', TAGS),
  'plain {tag_unknown} text'
);
assertEq(
  'missing tags registry skips work',
  P.expandTagPlaceholders('plain {tag_legendary} text', null),
  'plain {tag_legendary} text'
);

// ── expandShortItemPlaceholders ────────────────────────────────────

console.log('\n── expandShortItemPlaceholders ──');
assertContains(
  'bare {vote_key} expands to slot',
  P.expandShortItemPlaceholders('Trade a {vote_key}.', ITEMS),
  'class="invslot inline-invslot"'
);
assertEq(
  'unknown {fake_item} stays literal',
  P.expandShortItemPlaceholders('See {fake_item} above.', ITEMS),
  'See {fake_item} above.'
);
assertEq(
  '{dropdown} marker is preserved',
  P.expandShortItemPlaceholders('Toggle {dropdown} here.', ITEMS),
  'Toggle {dropdown} here.'
);
assertEq(
  'numeric {1234} ignored (regex requires leading letter)',
  P.expandShortItemPlaceholders('Numbers {1234} stay.', ITEMS),
  'Numbers {1234} stay.'
);
assertEq(
  'empty braces {} ignored',
  P.expandShortItemPlaceholders('Empty {} braces.', ITEMS),
  'Empty {} braces.'
);
assertEq(
  'missing items registry skips work',
  P.expandShortItemPlaceholders('No {vote_key} expansion.', null),
  'No {vote_key} expansion.'
);

// ── expandAll pipeline ─────────────────────────────────────────────

console.log('\n── expandAll pipeline ──');
var mixed = P.expandAll(
  'Use {item:pyroclastic_pickaxe} or {vote_key} — tag {tag_legendary}.',
  ITEMS, TAGS
);
assertContains('explicit slot present',  mixed, 'href="/wiki/pyroclastic/"');
assertContains('bare slot present',      mixed, 'data-minetip-text="Trade for rewards."');
assertContains('tag image present',      mixed, '<img src="/img/tags/legendary.png"');
assertEq(
  'no leftover {item:...} braces',
  mixed.indexOf('{item:'),
  -1
);

// Ordering check: a hypothetical author who writes both {tag_X} and a
// real item id called `tag_X` should see the tag expander win, because
// it runs before the bare matcher. We simulate that by adding an item
// whose id collides with the tag key.
var ITEMS_WITH_COLLISION = Object.assign({}, ITEMS, {
  tag_legendary: { name: 'Trap', img: '/x.png', tooltip: '', tags: [] }
});
var collision = P.expandAll('Mark: {tag_legendary}.', ITEMS_WITH_COLLISION, TAGS);
assertContains(
  'tag expander wins over colliding item id',
  collision,
  'class="wiki-tag-icon"'
);
assertEq(
  'collision did not produce an inv slot',
  collision.indexOf('inline-invslot'),
  -1
);

// ── Summary ────────────────────────────────────────────────────────

console.log('\n──────────────────────────────────────');
console.log(passed + ' pass, ' + failed + ' fail');
process.exit(failed ? 1 : 0);
