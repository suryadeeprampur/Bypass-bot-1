// ==UserScript==
// @name        pahe.ink soractrl linegee.net
// @match       *://linegee.net/*
// @match       *://teknoasian.com/*
// @run-at      document-start
// ==/UserScript==

// ----- Bypass pahe.ink soractrl ------
// source: https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues/14#issuecomment-2588262

(function() {
    const domainRegex = /linegee.net|teknoasian.com/
    if (domainRegex.test(window.location.href)) {

      const fakeEvent = {isTrusted: true, originalEvent: {isTrusted: true}};

      // Wait for jQuery to load
      const waitForJQuery = setInterval(() => {
          if (typeof jQuery !== "undefined") {
              clearInterval(waitForJQuery);

              // Override jQuery's `.on` method
              const originalOn = unsafeWindow.jQuery.fn.on;

              unsafeWindow.jQuery.fn.on = function(eventType, selector, handler, ...args) {
                  // Check if it's a "click" event on #soralink-human-verif-main
                  if (eventType === "click" && (this.is("#soralink-human-verif-main") || this.is(selector === "#generater") || this.is("#showlink"))) {
                      // Call the function immediately if handler is directly passed
                      if (typeof selector === "function") {
                          selector(fakeEvent); // Call the function
                      } else if (typeof handler === "function") {
                          handler(fakeEvent); // Call the handler
                      }
                  }

                  // Call the original .on method
                  return originalOn.call(this, eventType, selector, handler, ...args);
              };

              // Check if the element #soralink-human-verif-main exists
              if (!document.getElementById("soralink-human-verif-main")) {
                  // This is the second and third step with #generater and #showlink
                  setInterval(() => {
                      unsafeWindow.jQuery("#pleasewaits").hide();
                      unsafeWindow.jQuery("#showlink").show();
                  }, 1000);
              }
          }
      }, 10); // Check every 10ms
    }
})();
// ----- -----
