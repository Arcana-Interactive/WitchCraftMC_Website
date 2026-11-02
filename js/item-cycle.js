/* Rotates recipe slots that accept several items (see `cycle` in items.yml).
   Only the first item in .invslot-cycle is visible, so moving it to the end shows the next.
   All slots pause together while one is hovered, so they always show the same item. */
( function () {
  'use strict';

  setInterval( function () {
    if ( document.querySelector( '.invslot-cycle:hover' ) ) return;
    document.querySelectorAll( '.invslot-cycle' ).forEach( function ( cycle ) {
      cycle.appendChild( cycle.firstElementChild );
    } );
  }, 2000 );
} )();
