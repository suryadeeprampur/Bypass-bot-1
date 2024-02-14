// ==UserScript==
// @name        shareus.io bypass
// @match       *://*.shareus.io/*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for shareus.io -----
(function() {
    'use strict';
    if (window.location.hostname === 'shareus.io') {
        document.addEventListener('DOMContentLoaded', function() { // Wait for the page to be loaded

            function clickButton() {
                const button = document.querySelector("#root > div > main > div.main-container-1 > div.main-container-2 > div:nth-child(1) > div.adunit-container > button");
                if (button) {
                    button.click();
                    //clearInterval(intervalId); // Stop attempting once clicked
                }
            }
            const intervalId = setInterval(clickButton, 1000); // Set interval to attempt clicking every 1 second

        });
    }
})();
// ----- ----- -----

