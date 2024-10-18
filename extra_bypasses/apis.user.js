// ==UserScript==
// @name          bypass.vip and bypass.city APIs
// @match         https://bleleadersto.com/s?*
// @match         https://tonordersitye.com/s?*
// @match         https://daughablelea.com/s?*
// @match         https://linkvertise.com/*
// @include       /^(https?:\/\/)(loot-link.com|loot-links.com|lootlink.org|lootlinks.co|lootdest.(info|org|com)|links-loot.com|linksloot.net)\/s\?.*$/
// @run-at        document-start
// ==/UserScript==

// ----- bypass.vip and bypass.city APIs------
(function() {
    'use strict';
    const admavenRegex = /^https:\/\/(bleleadersto\.com|tonordersitye\.com|daughablelea\.com)\/s\?.*$/;
    const linkvertiseRegex = /^https:\/\/linkvertise\.com\/.*$/;
    const lootlinkRegex = /^(https?:\/\/)(loot-link.com|loot-links.com|lootlink.org|lootlinks.co|lootdest.(info|org|com)|links-loot.com|linksloot.net)\/s\?.*$/

    // Linkvertise easy case
    if (linkvertiseRegex.test(window.location.href) && window.location.search.includes('r=')) {
        const rParam = new URLSearchParams(window.location.search).get('r');
        if (rParam) {window.location.assign(atob(rParam));};

    // Linkvertise hard case and Admaven. First try bypass.vip, fallback to bypass.city
    } else if (admavenRegex.test(window.location.href) || linkvertiseRegex.test(window.location.href) || lootlinkRegex.test(window.location.href)) {
        fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(window.location.href)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status == 'success') {
                    window.location.assign(data.result);
                } else {
                    window.location.assign(`https://adbypass.org/bypass?bypass=${encodeURIComponent(window.location.href)}`);
                }
            })
            .catch(err => {
                window.location.assign(`https://adbypass.org/bypass?bypass=${encodeURIComponent(window.location.href)}`);
            });
    }
})();
// ----- ------ ----------

