// ==UserScript==
// @name         shrinkme.us bypass
// @match        https://*.shrinkme.us/*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for shrinkme.us -----
(function() {
    'use strict';
    if (window.location.href.startsWith("https://shrinkme.us/")) {
      function waitForButton() {
          var button = document.getElementById('invisibleCaptchaShortlink');
          if (button) {
              button.click();
          } else {
              setTimeout(waitForButton, 1000); // Check every second
          }
      }
      waitForButton();
    }
})();
// ----- ----- -----

