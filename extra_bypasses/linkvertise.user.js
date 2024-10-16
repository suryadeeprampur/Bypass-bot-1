// ==UserScript==
// @name         Linkvertise Bypass
// @include      /^(https?:\/\/)(?!(bypass.city|adbypass.org))(linkvertise.com|(linkvertise|link-to).net)/
// @run-at       document-start
// ==/UserScript==

// ----- Bypass Linkvertise ------
(function() {
    'use strict';

    if (/^(https?:\/\/)(?!(bypass.city|adbypass.org))(linkvertise.com|(linkvertise|link-to).net)/.test(window.location.href)) {

        //easy case
        let rParam = new URLSearchParams(window.location.search).get('r');
        if (rParam) {
            window.location.assign(atob(rParam));

        // hard case
        } else {

            // Bypass using Bypass.city API
            window.location.assign('https://adbypass.org/bypass?bypass=' + window.location.href);

        }
    }

})();
// ----- ------ ----------

