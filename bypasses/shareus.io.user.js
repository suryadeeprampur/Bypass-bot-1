// ==UserScript==
// @name        shareus.io bypass
// @match       *://*.shareus.io/*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for shareus.io -----
(function() {
    'use strict';
    if (window.location.hostname === 'shareus.io') {
        document.addEventListener('DOMContentLoaded', function() {
            // Define the button selector
            const buttonSelector = "#root > div > main > div.main-container-1 > div.main-container-2 > div:nth-child(1) > div.adunit-container > button";
        
            // Function to click the button
            function clickButton() {
                // Find the button element
                const button = document.querySelector(buttonSelector);
                if (button) {
                    button.click();
                    console.log("Button clicked!");
                    //clearInterval(intervalId); // Stop attempting once clicked
                } else {
                    console.log("Button not found!");
                }
            }
        
            // Set interval to attempt clicking every 1 second
            const intervalId = setInterval(clickButton, 1000);
        });
    }
})();
// ----- ----- -----
