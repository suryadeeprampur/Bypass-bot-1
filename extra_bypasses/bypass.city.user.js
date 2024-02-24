// ==UserScript==
// @name         bypass.city redirect helper
// @include      /(bypass.city|adbypass.org)\/bypass\?bypass=/
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bypass.city
// ==/UserScript==

// ----- bypass.city redirect helper -----
(function() {
    'use strict';
    let url = window.location.href;
    const isValidUrl = url => { try { new URL(url); return true; } catch (error) { return false; } };

    function makeUrlClickable(element) {
        let url = element.textContent.match(/(https?:\/\/\S+)/)[0];
        if (url && isValidUrl(url)) {
            let link = document.createElement('a'); link.href = url; link.textContent = url;
            element.innerHTML = element.innerHTML.replace(url, link.outerHTML);
            return url;
        }
    }

    if (/(bypass.city|adbypass.org)\/bypass\?bypass=/.test(url)){
      window.addEventListener('load', function() { //After window loaded
        let checkInterval = setInterval(function() { //Check every 0.5s if the link is available
            let linkContainerElement = document.querySelector('div.mantine-fn96xv:nth-child(3)');
            if (linkContainerElement && linkContainerElement.innerHTML.includes('http')) {
                clearInterval(checkInterval);
                let targetUrl = makeUrlClickable(linkContainerElement);
                // if (confirm("redirect to " + targetUrl + " ?")) {window.location.assign(targetUrl);};
            }
        }, 500);
      });
    }
})();
// ----- ----- -----
