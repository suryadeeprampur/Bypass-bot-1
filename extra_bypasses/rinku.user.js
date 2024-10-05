// ==UserScript==
// @name         Rinku autoclick
// @include /^(https?:\/\/)(.+)?((actualpost|americanstylo|beautifulfashionnailart|dadinthemaking|glowandglamcorner|listofthis|lobirtech).com)(\/.*)/
// @run-at       document-start
// ==/UserScript==

// ----- Bypass Rinku ------
// source: https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues/165
// example: https://rinku.me/0XLi6
(function() {
    "use strict";

    const domainRegex = /(actualpost|americanstylo|beautifulfashionnailart|dadinthemaking|glowandglamcorner|listofthis|lobirtech).com/

    if (domainRegex.test(window.location.href)) {

        window.addEventListener('load', function() {

            // Override the hasFocus function
            document.hasFocus = function() {
                return true; // Always return true
            };

            // Function to check for "Click Any Ad & Keep It Open For 15 Seconds To Continue" and reload the page if it exists
            function checkForMessage() {
                const paragraphs = document.getElementsByTagName("p");
                for (let p of paragraphs) {
                    if (p.textContent.includes("Click Any Ad & Keep It Open For 15 Seconds To Continue") || p.textContent.includes("Click Any Ad &amp; Keep It Open For 15 Seconds To Unlock Captcha")) {
                        console.log("Detected the message. Reloading the page...");
                        //alert("Unbypassable page type. Reloading the page...");
                        location.reload(); // Reload the page
                        return; // Exit the function after reloading
                    }
                }
            }

            // Function to check and click the button
            function clickStepButton() {
                const buttons = document.querySelectorAll("button");
                for (let button of buttons) {
                    if (button.textContent.includes("Step") && isElementVisibleAndEnabled(button)) {
                        button.click();
                        console.log("Clicked the button: ", button);
                        return; // Stop after clicking the first found button
                    }
                }
            }

            // Function to observe button changes
            function observeButtons() {
                const buttons = document.querySelectorAll("button");
                buttons.forEach(button => {
                    const observer = new MutationObserver(() => {
                        // Check if the button is enabled or visibility changed
                        if (isElementVisibleAndEnabled(button)) {
                            clickStepButton(); // Attempt to click if it meets criteria
                        }
                    });
                    observer.observe(button, {
                        attributes: true,
                        attributeFilter: ["disabled"] // Observe changes to the disabled attribute
                    });
                });
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

            // Create a MutationObserver to detect DOM changes
            const observer = new MutationObserver(clickStepButton);

            // Observe changes in the entire document
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Initial checks
            observeButtons();
            checkForMessage();
            clickStepButton();

        });

    }
})();
// ----- End Bypass Rinku -----
