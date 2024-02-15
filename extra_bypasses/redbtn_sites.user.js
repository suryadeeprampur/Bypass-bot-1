// ==UserScript==
// @name        redbtn sites
// @include     /((cybertyrant|profitshort|technorozen|hubdrive.me|bestadvise4u|newztalkies|aiotechnical|cryptonewzhub|techvybes|wizitales|101desires|gdspike).com|courselinkfree.us|10desires.org|theapknews.shop|trendzguruji.me)/
//.rd_btn sites, vegamovies.ngo, https://github.com/uBlockOrigin/uAssets/commit/f450ad365a3475c9f4143f4b447c7de994737b3a
// @run-at      document-start
// ==/UserScript==

// ----- redbtn sites bypass -----
(function() {
  'use strict';
  if (/((cybertyrant|profitshort|technorozen|hubdrive.me|bestadvise4u|newztalkies|aiotechnical|cryptonewzhub|techvybes|wizitales|101desires|gdspike).com|courselinkfree.us|10desires.org|theapknews.shop|trendzguruji.me)/.test(window.location.href)){
    document.addEventListener('DOMContentLoaded', function() { //Wait for the page to be loaded
      var intervalId = setInterval(function() { //check every 0.5s
        var rdBtn = document.querySelector('.rd_btn');
        if (rdBtn) {
          if (rdBtn.href && rdBtn.href.includes("/?re=")){ //If redbtn has link, redirect to it
              window.location.assign(rdBtn.href)
              clearInterval(intervalId);
          } else { //If it doesnt have link, just click it
            rdBtn.click()
          }
        }
      }, 500);
    })
  }
})();
// ----- ----- -----

