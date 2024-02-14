// ==UserScript==
// @name        simple redirects
// @include     /mundopolo.net/
// @include     /comohoy.com/
// @include     /sphinxanime.com\/short/
// @include     /link.manudatos.com\/#!/
// @run-at      document-start
// ==/UserScript==

// ----- Simple redirects -----
(function() {
    'use strict';
    const url = window.location.href
    const redirect = finalUrl => window.location.assign(finalUrl);

    /mundopolo.net/.test(url) ? redirect(decodeURIComponent(atob(atob(atob(url.split('#!')[1]))))) : null;
    /comohoy.com/.test(url) ? redirect(atob(url.split('?url=')[1])) : null;
    /sphinxanime.com\/short/.test(url) ? redirect(atob(url.split('?anonym=')[1])) : null;
    /link.manudatos.com\/#!/.test(url) ? redirect(atob(atob(atob(url.split('#!')[1])))) : null;
})();
// ----- ----- -----

