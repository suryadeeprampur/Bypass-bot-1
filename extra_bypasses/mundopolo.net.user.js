// ==UserScript==
// @name        mundopolo.net bypass
// @match       https://m.mundopolo.net/#!*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for mundopolo.net -----
(function() {
    'use strict';
    if ( window.location.href.startsWith('https://m.mundopolo.net/#!') ) {
      window.location.assign(decodeURIComponent(atob(atob(atob(window.location.href.split('#!')[1])))));
    }
})();
// ----- ----- -----

