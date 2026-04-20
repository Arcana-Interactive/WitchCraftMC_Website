/**
 * minetip.js — Minecraft-style item tooltips
 * Vanilla JS port of the wiki.gg Common.js minetip module.
 * Trigger: any element with class "minetip" or "invslot-item".
 *
 * Data attributes:
 *   title / data-minetip-title  — item name (supports &colour codes)
 *   data-minetip-text           — description; use "/" for line breaks
 *
 * Minecraft colour codes  (&0–&f, &l bold, &o italic, &n underline, &m strike)
 * Custom hex colour:  &#RRGGBB  or  &$RGB
 */
( function () {
  'use strict';

  /* Skip entirely on touch-primary devices — no hover means no minetips */
  if ( window.matchMedia( '(hover: none)' ).matches ) return;

  /* ── helpers ───────────────────────────────────────────────────── */
  var ESC = { '\\&': '&#38;', '<': '&#60;', '>': '&#62;' };

  function esc( t ) {
    return t
      .replace( /\\\\/g, '&#92;' )
      .replace( /\\&|[<>]/g, function ( c ) { return ESC[ c ]; } );
  }

  /* Iteratively wrap &X...&r spans. Safety-limited to avoid infinite loops. */
  function parseCodes( html ) {
    var n = 0;
    while (
      /&(?:[0-9a-jl-qs-vyz]|#[0-9a-fA-F]{6}|\$[0-9a-fA-F]{3})/.test( html )
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
    return html.replace( /&r/g, '' );
  }

  /* ── tooltip state ─────────────────────────────────────────────── */
  var tip     = null;
  var wW, wH, tW, tH;

  function create( el ) {
    destroy();

    /* ── resolve title ── */
    var title = el.dataset.minetipTitle;

    if ( title === undefined ) {
      var attr = el.getAttribute( 'title' );
      if ( attr !== null ) {
        title = attr.trim().replace( /&/g, '\\&' );
      } else {
        /* Walk into children to find deepest title */
        var child = el.firstChild, found;
        while ( child ) {
          if ( child.nodeType === 1 && child.hasAttribute( 'title' ) ) {
            found = child.getAttribute( 'title' );
          }
          child = child.firstChild;
        }
        if ( found === undefined ) return;
        title = found.trim().replace( /&/g, '\\&' );
      }
      el.dataset.minetipTitle = title;
    }

    /* Strip native title attrs so the browser tooltip doesn't appear */
    if ( !el.dataset.minetipReady ) {
      var titled = el.querySelectorAll( '[title]' );
      for ( var i = 0; i < titled.length; i++ ) titled[ i ].removeAttribute( 'title' );
      el.removeAttribute( 'title' );
      el.dataset.minetipReady = '1';
    }

    if ( !title ) return;

    /* ── build HTML ── */
    var html = '<span class="minetip-title">' + esc( title ) + '&r</span>';

    var desc = ( el.dataset.minetipText || '' ).trim();
    if ( desc ) {
      html +=
        '<span class="minetip-description">' +
        esc( desc ).replace( /\\\//g, '&#47;' ).replace( /\//g, '<br>' ) +
        '&r</span>';
    }

    html = parseCodes( html );

    /* ── Replace {tag_xxx} placeholders with inline images ──
     *  Supports optional pixel shift:  {tag_shovel:-2}
     *  Negative values pull the tag closer to its left neighbour.
     *  Positive values push it further away.  No value = default CSS margin.
     */
    if ( window.WIKI_TAGS ) {
      html = html.replace( /\{tag_([a-zA-Z0-9_]+)(?::(-?[0-9.]+))?\}/g, function ( m, key, shift ) {
        var src = window.WIKI_TAGS[ key ];
        if ( src ) {
          var style = shift ? ' style="margin-left:' + shift + 'px"' : '';
          return '<img src="' + src + '" alt="' + key + '" class="minetip-tag-icon"' + style + '>';
        }
        return m;
      } );
    }

    /* ── mount ── */
    tip = document.createElement( 'div' );
    tip.id = 'minetip-tooltip';
    tip.innerHTML = html;
    document.body.appendChild( tip );

    /* Cache sizes for position logic */
    wW = window.innerWidth;
    wH = window.innerHeight;
    tW = tip.offsetWidth;
    tH = tip.offsetHeight;
  }

  function position( x, y ) {
    if ( !tip ) return;
    var top  = y - 34;
    var left = x + 14;

    if ( left + tW > wW ) left -= tW + 36;
    if ( left < 0 ) {
      left = 0;
      top -= tH - 22;
      if ( top < 0 ) top += tH + 47;
    } else if ( top < 0 ) {
      top = 0;
    } else if ( top + tH > wH ) {
      top = wH - tH;
    }

    tip.style.top  = top  + 'px';
    tip.style.left = left + 'px';
  }

  function destroy() {
    if ( tip ) { tip.remove(); tip = null; }
  }

  /* ── event delegation ──────────────────────────────────────────── */
  var SELECTOR = '.minetip, .invslot-item';

  document.addEventListener( 'mouseover', function ( e ) {
    var el = e.target.closest && e.target.closest( SELECTOR );
    if ( el ) {
      create( el );
      position( e.clientX, e.clientY );
    } else {
      destroy();
    }
  } );

  document.addEventListener( 'mousemove', function ( e ) {
    if ( !tip ) return;
    if ( e.target.closest && e.target.closest( SELECTOR ) ) {
      position( e.clientX, e.clientY );
    }
  } );

  document.addEventListener( 'mouseout', function ( e ) {
    var el = e.target.closest && e.target.closest( SELECTOR );
    if ( el && !el.contains( e.relatedTarget ) ) destroy();
  } );

}() );
