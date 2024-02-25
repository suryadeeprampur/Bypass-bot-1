// ==UserScript==
// @name         Ad-maven 3rd party bypass
// @description  These bypasses are always merged into Bypass_All_Shortlinks.user.js
// @include      /(free-content.pro|((ebaticalfel|downbadleaks|megadropsz|megadumpz|stownrusis|iedprivatedqu).com))\/s\?/
// @include      /adbypass.eu/
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @run-at       document-start
// ==/UserScript==

// ----- Bypass ad-maven with adbypass.eu -----
(function() {
    'use strict';
    var url = window.location.href;
    if (/(free-content.pro|((ebaticalfel|downbadleaks|megadropsz|megadumpz|stownrusis|iedprivatedqu).com))\/s\?/.test(url)) {
        GM_setValue('savedShortlink', url);
        window.location.assign('https://adbypass.eu/');
    } else if (/adbypass.eu/.test(url) && !url.includes('/unblock')) {
        window.addEventListener("load", function(event) {
            var savedShortlink = GM_getValue('savedShortlink', null);
            var inputField = document.querySelector('#inputt');
            if (savedShortlink && inputField) {
                inputField.value = savedShortlink;
                GM_deleteValue('savedShortlink');
                setTimeout(function() {
                    let bypassButton = document.querySelector('#bttn');
                    if (bypassButton) {
                        bypassButton.click();
                        alert('Bypass started. Wait a few seconds.')
                    }
                }, 500);// Wait 0.5 to press the button
            }
        });
    } else if (/adbypass.eu\/unblock/.test(url)) {
        window.addEventListener('load', function() {
            var linkElement = document.querySelector('.form__group > a:nth-child(5)');
            if (linkElement && linkElement.href) {
                if (confirm('Bypass done.\nRedirect to ' + linkElement.href + ' ?')) {
                    window.location.assign(linkElement.href);
                }
            }
        });
    }
})();
// ----- ----- -----
