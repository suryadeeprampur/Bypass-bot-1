// ==UserScript==
// @name         LinkSpy concatenated with clicksfly.com Bypass
// @match        https://linkspy.cc/tr/*
// @run-at       document-start
// ==/UserScript==

// ----- Bypass for linkspy.cc + clicksfly.com  -----
(function() {
    'use strict';
    if ( window.location.href.startsWith('https://linkspy.cc/tr/') ) {

      //----Bypass linkspy.cc----
      var encodedUrl = window.location.href.split('/tr/')[1];
      var decodedUrl = atob(encodedUrl);
      if (!decodedUrl.startsWith('https://clicksfly.com/')) {
        window.location.assign(decodedUrl);

      //----Bypass clicksfly.com----
      } else if (decodedUrl.startsWith('https://clicksfly.com/')) {
        var urlParam = new URLSearchParams(decodedUrl).get('url');
        var decodedURL2 = atob(urlParam);
        window.location.assign(decodedURL2);
      }
    }

})();
// ----- ----- -----

