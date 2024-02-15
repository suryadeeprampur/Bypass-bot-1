// ==UserScript==
// @name         LinkSpy concatenated with clicksfly.com Bypass
// @match        https://linkspy.cc/tr/*
// @run-at       document-start
//example ttps://linkspy.cc/tr/aHR0cHM6Ly9jbGlja3NmbHkuY29tL2Z1bGw/YXBpPWNhMDNkN2Q1YzBjODgzMzViMGY5YmVmZDkyMWQ5YWYxMWZmZmM4OTEmdXJsPWFIUjBjSE02THk5M2QzY3VabWxzWldOeWVYQjBMbU5qTDBOdmJuUmhhVzVsY2k5RlFrTTVSRE5GUkVZNUxtaDBiV3c9JnR5cGU9Mg==
// ==/UserScript==

// ----- Bypass for linkspy.cc + clicksfly.com  -----
(function() {
    'use strict';
    if ( window.location.href.startsWith('https://linkspy.cc/tr/') ) {

      //----Bypass linkspy.cc----
      var decodedUrl = atob(window.location.href.split('/tr/')[1]);
      var urlParam = new URLSearchParams(decodedUrl).get('url');
      if (!decodedUrl.startsWith('https://clicksfly.com/') || !urlParam) {
        window.location.assign(decodedUrl);

      //----Bypass clicksfly.com----
      } else if (decodedUrl.startsWith('https://clicksfly.com/') && urlParam) {
        window.location.assign(atob(urlParam));
      }
    }

})();
// ----- ----- -----

