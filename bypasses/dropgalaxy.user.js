// ==UserScript==
// @name        dropgalaxy bypass
// @match       https://dropgalaxy.com/drive/*
// @match       https://dropgalaxy.co/drive/*
// @require     https://code.jquery.com/jquery-2.1.1.min.js
// @run-at      document-start
// ==/UserScript==

// ----- Bypass for dropgalaxy -----
(function() {
    'use strict';
    if (/^https?:\/\/dropgalaxy\.(com|co)\/drive\/.*/.test(window.location.href)) {
        document.addEventListener('DOMContentLoaded', function() {

            function clickButton(selector) {
                var button = document.querySelector(selector);
                if (button) {
                    button.click();
                    console.log('Button with selector ' + selector + ' clicked!');
                } else {
                    console.log('Button with selector ' + selector + ' not found!');
                }
            }

            // 1st PAGE - click the hidden button inmediately
            clickButton('#method_free');

            // 2nd PAGE - 16 seconds delay to click the initially blocked #downloadbtn
            setTimeout(function() {
                clickButton('#downloadbtn');
            }, 16000); // (if you click it from the beginning, it triggers adblock detection)

            // 3rd PAGE - Extract the download link as soon as it is available
            (function($) {
                'use strict';
            
                // Check for the presence of the form element at regular intervals
                var intervalId = setInterval(function() {
                    var $downloadForm = $('#dllink');
            
                    // Check if the form element is present
                    if ($downloadForm.length > 0) {
                        // Extract the URL from the form action attribute
                        var url = $downloadForm.attr('action');
            
                        // Stop the interval since the URL is found
                        clearInterval(intervalId);
            
                        // Show download link in a popup
                        //alert('Press OK to go to the download link:\n' + url);
            
                        // Redirect to the download link
                        window.location.href = url;
                    }
                }, 1000);
            
            })(jQuery);

            
        });
    }
})();
// ----- ----- -----
