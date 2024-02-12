// ==UserScript==
// @name        mundopolo.net bypass
// @match       https://m.mundopolo.net/#!*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for mundopolo.net -----
(function() {
    'use strict';
    if ( window.location.href.startsWith('https://m.mundopolo.net/#!') ) {
      var currentURL = window.location.href;
      var encodedURL = currentURL.split('#!')[1]
      var decodedURL = atob(atob(atob(encodedURL))); //base64 decode x3
      decodedURL = decodeURIComponent(decodedURL);
      window.location.assign(decodedURL);
    }
})();
// ----- ----- -----

