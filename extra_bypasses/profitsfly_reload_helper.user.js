// ==UserScript==
// @name        profitsfly reload helper
// @include     /^https:\/\/.*\.(tradeshowrating\.com|historyofyesterday\.com)\/.*/
// @run-at      document-start
// ==/UserScript==

//---profitsfly reload helper----
(function() {
    "use strict";

    const domainRegex = /^https:\/\/.*\.(tradeshowrating\.com|historyofyesterday\.com)\/.*/;
    if (domainRegex.test(window.location.href)) {
        window.addEventListener('load', function() {
            // Functions to check for messages like "Click any ad & keep it open for 15 seconds to continue" and reload the page if one exists
            function checkForMessage() {
                const paragraphs = document.getElementsByTagName("p");
                for (let p of paragraphs) {
                    if (/.*click.+ad.*to.+continue.*/is.test(p.textContent) && isElementVisibleAndEnabled(p)) {
                        location.reload(); // Reload the page
                        return; // Exit the function after reloading
                    }
                }
            }

            // Helper function to determine if an element is visible and enabled
            function isElementVisibleAndEnabled(el) {
                // Check if the element and all its parents are visible
                let currentElement = el;
                while (currentElement) {
                    const style = getComputedStyle(currentElement);
                    if (style.display === "none" || style.visibility === "hidden") {
                        return false; // Element or parent is not visible
                    }
                    currentElement = currentElement.parentElement; // Move up the DOM tree
                }
                // Check if the button is enabled
                return !el.disabled;
            }

            setInterval(checkForMessage, 1000);
        });
    }
})();
//-------
