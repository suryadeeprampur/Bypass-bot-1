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
        let initialUrl = element.textContent;
        let url = element.textContent.replace('The resolved url is: ', '')
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        url = url.match(/(https?:\/\/\S+)/)[0];
        if (url && isValidUrl(url) && !url.endsWith('...')) {
            let link = document.createElement('a'); link.href = url; link.textContent = url;
            element.innerHTML = 'The resolved url is: ' + element.innerHTML.replace(initialUrl, link.outerHTML);
            return url;
        }
    }

    if (/(bypass.city|adbypass.org)\/bypass\?bypass=/.test(url)){
      window.addEventListener('load', function() { //After window loaded
        let checkInterval = setInterval(function() { //Check every 0.5s if the link is available
            let linkContainerElement = document.querySelector('div.mantine-fn96xv:nth-child(3)');
            if (linkContainerElement) {
                clearInterval(checkInterval);
                let targetUrl = makeUrlClickable(linkContainerElement);
                if (isValidUrl(targetUrl)) {
                    setTimeout(function() { window.location.assign(targetUrl); }, 4000);
                }
            }
        }, 500);
      });
    }
})();
// ----- ----- -----
