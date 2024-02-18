// ==UserScript==
// @name        simple redirects
// @include     /mundopolo.net/
// @include     /comohoy.com/
// @include     /sphinxanime.com\/short/
// @include     /japan-paw.net\/out/
// @include     /link.manudatos.com\/#!/
// @include     /(iconicblogger.com|segurosdevida.site)/
// @include     /link.unlockner.com/
// @include     /cybercityhelp.in/
// @include     /www.akcartoons.in/
// @include     /go.moonlinks.in/
// @include     /shrinkme.us/
// @include     /shareus.io/
// @include     /shareus\.io\/go\?sid=/
// @include     /(verpeliculasonline.org|subtituladas.com)\/enlace/
// @include     /links.cuevana.ac\/short/
// @include     /ouo.io/
// @include     /fc-lc.(xyz|com)/
// @include     /1v.to\/t/
// @include     /linkspy.cc\/tr/
// @include     /((cybertyrant|profitshort|technorozen|hubdrive.me|bestadvise4u|newztalkies|aiotechnical|cryptonewzhub|techvybes|wizitales|101desires|gdspike).com|courselinkfree.us|10desires.org|theapknews.shop|trendzguruji.me)/
// @include     /dropgalaxy.(com|co)\/drive/
// @include     /short-ly.co/
// @include     /shramikcard.in/
// @include     /blogging.techworldx.net/
// @run-at      document-start
// ==/UserScript==

// ----- Extra bypasses -----
(function() {
    'use strict';
    const url = window.location.href
    const redirect = finalUrl => window.location.assign(finalUrl);
    const getParam = (url, param) => new URLSearchParams(url).get(param);
    const popupsToRedirects = () => window.open = (url, target, features) => (window.location.href = url, window);
    const afterDOMLoaded = (callback) => document.addEventListener('DOMContentLoaded', callback);
    const isValidUrl = url => { try { new URL(url); return true; } catch (error) { return false; } };
    const clickIfExists = (selector) => { let intervalId = setInterval(() => { let button = document.querySelector(selector); if (button) { clearInterval(intervalId); button.click(); } }, 1000); };
    const redirectIfExists = (selector) => { let intervalId = setInterval(() => { let button = document.querySelector(selector); if (button.href) { clearInterval(intervalId); redirect(button.href) } }, 500); };
    const clickIfExistsNonStop = (selector) => { let intervalId = setInterval(() => { let button = document.querySelector(selector + ':not(.disabled)'); if (button) { button.click(); } }, 500); };
    const redirectIfNotDisabled = (selector) => { let intervalId = setInterval(() => { let linkButton = document.querySelector(selector + ':not(.disabled)'); if (linkButton) { clearInterval(intervalId); redirect(linkButton.href); } }, 500); };
    const clickIfNotDisabled = (buttonSelector) => { let intervalId = setInterval(() => { let button = document.querySelector(buttonSelector); if (!button.hasAttribute('disabled')) { clearInterval(intervalId); setTimeout(function() {button.click();}, 500) } }, 500); };
    const redirectOrClickIfExistsEnabledWithDelay = (selector) => { afterDOMLoaded(function() { //Wait for the page to load
        let intervalId = setInterval(() => { //Check every 0.5s
          let button = document.querySelector(selector + ':not(.disabled)'); //Check the element is not disabled
          if (button) {setTimeout(() => { isValidUrl(button.href) ? redirect(button.href) : button.click();}, 100);} //Redirect or click, with a 0.1s delay
        }, 500);});};
    const checkElementVisible = element => element !== null && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length) && (!element.getAttribute('style') || !element.getAttribute('style').includes('display:none'));
    const clickIfVisible = selector => { afterDOMLoaded(function() { let intervalId = setInterval(() => { let element = document.querySelector(selector); if (checkElementVisible(element)) { clearInterval(intervalId); element.click(); } }, 1000); }); };


    //peliculasgd.net
    /mundopolo.net/.test(url) ? redirect(decodeURIComponent(atob(atob(atob(url.split('#!')[1]))))) : null;

    //leak.sx & pornleaks.in
    /comohoy.com/.test(url) ? redirect(atob(url.split('?url=')[1])) : null;

    //sphinxanime.com
    /sphinxanime.com\/short/.test(url) ? redirect(atob(url.split('?anonym=')[1])) : null;

    //japan-paw.net
    /japan-paw.net\/out/.test(url) ? redirect(atob(url.split('out/?')[1])) : null;

    //pasteprivado.blogspot.com
    /link.manudatos.com\/#!/.test(url) ? redirect(atob(atob(atob(url.split('#!')[1])))) : null;

    //intercambiosvirtuales.org
    /1v.to\/t/.test(url) ? redirect(atob(atob(atob(atob( atob(url.split('/t/')[1]).replace('+P', '') ))))) : null;

    //anime-world.in and mandranime.com
    /(iconicblogger.com|segurosdevida.site)/.test(url) ? afterDOMLoaded(function() {redirect(document.getElementById('wpsafe-link').querySelector('a').getAttribute('onclick').match(/window\.open\('([^']*)'/)[1])}) : null;

    //anime-world.in 2nd step
    /link.unlockner.com/.test(url) ? afterDOMLoaded(function() {redirectIfNotDisabled('.btn.get-link')}) : null;

    //atozcartoonist.com
    /cybercityhelp.in/.test(url) ? afterDOMLoaded(function() {document.querySelector('#username').value = 'filler'}) : null;
    /cybercityhelp.in/.test(url) ? afterDOMLoaded(function() {document.querySelector('#tp982').click()}) : null;
    /cybercityhelp.in/.test(url) ? afterDOMLoaded(function() {document.querySelector('button.tp-btn.tp-blue').click()}) : null;
    /www.akcartoons.in/.test(url) ? afterDOMLoaded(function() {document.querySelector('#btn6 > button').click()}) : null;
    /www.akcartoons.in/.test(url) ? afterDOMLoaded(function() {redirect(document.querySelector('a[href*="go.moonlinks.in"]'))}) : null;
    /go.moonlinks.in/.test(url) ? afterDOMLoaded(function() {redirectIfNotDisabled('a.btn')}) : null;

    //shrinkme.us
    /shrinkme.us/.test(url) ? afterDOMLoaded(function() {clickIfNotDisabled('#invisibleCaptchaShortlink')}) : null;

    //fc-lc
    /fc-lc.(xyz|com)/.test(url) ? afterDOMLoaded(function() {clickIfNotDisabled('#invisibleCaptchaShortlink')}) : null;

    //shareus.io https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues/2
    /shareus.io/.test(url) ? afterDOMLoaded(function() {clickIfExistsNonStop('#root > div > main > div.main-container-1 > div.main-container-2 > div:nth-child(1) > div.adunit-container > button')}) : null;

    // shareus.io (type 2) https://github.com/uBlockOrigin/uAssets/discussions/17361#discussioncomment-8501665
    if (/shareus\.io\/go\?sid=/.test(url)){
      popupsToRedirects();
      let selector = '#custom-root > div > div:nth-child(3) > div.flex.align-center.space-between.button-texts > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeLarge.MuiButton-containedSizeLarge.css-s7ybtv';
      afterDOMLoaded(function() {setTimeout(() => { clickIfExists(selector);}, 1000);})
    }

    //verpeliculasonline.org && subtituladas.com
    /(verpeliculasonline.org|subtituladas.com)\/enlace/.test(url) ? afterDOMLoaded(function() {redirect(document.getElementById('link').href.split('?s=')[1])}) : null;

    //maxcine.net
    /links.cuevana.ac\/short/.test(url) ? afterDOMLoaded(function() {
        var extractedUrl = document.documentElement.innerHTML.split('\n').find(line => line.includes("document.getElementById('contador').href = 'htt")).split("href")[1].match(/'([^']+)'/)[1];
        extractedUrl.includes('?s=') ? redirect(extractedUrl.split('?s=')[1]) : redirect(extractedUrl);
    }) : null;

    //ouo.io
    /ouo.io/.test(url) ? afterDOMLoaded(function() {clickIfNotDisabled('#btn-main')}) : null;

    //rd_btn sites https://github.com/uBlockOrigin/uAssets/issues/22146
    /((cybertyrant|profitshort|technorozen|hubdrive.me|bestadvise4u|newztalkies|aiotechnical|cryptonewzhub|techvybes|wizitales|101desires|gdspike).com|courselinkfree.us|10desires.org|theapknews.shop|trendzguruji.me)/.test(url) ?
        redirectOrClickIfExistsEnabledWithDelay('.rd_btn') : null;

    //linkspy.cc & clicksfly.com concatenated https://github.com/FastForwardTeam/FastForward/issues/1352
    if (/linkspy.cc\/tr/.test(url)){
        var decodedUrl = atob(url.split('/tr/')[1]);
        var urlParam = getParam(decodedUrl,'url');
        /clicksfly.com/.test(decodedUrl) && urlParam ? redirect(atob(urlParam)) : redirect(decodedUrl);
    }

    //dropgalaxy https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues/2
    /dropgalaxy.(com|co)\/drive/.test(url) ? afterDOMLoaded(function() {clickIfExists('#method_free')}) : null;
    /dropgalaxy.(com|co)\/drive/.test(url) ? afterDOMLoaded(function() {clickIfNotDisabled('#downloadbtn')}) : null;
    /dropgalaxy.(com|co)\/drive/.test(url) ? afterDOMLoaded(function() {
        var intervalId = setInterval(function() {// Keep checking if link is available, every 1s
            var downloadUrl = document.getElementById('dllink').getAttribute('action');
            if (downloadUrl) {
                clearInterval(intervalId);
                alert('Press OK to go to the download link:\n' + downloadUrl);
                redirect(downloadUrl)
            }
        }, 1000);
    }) : null;

    // short-ly.co https://github.com/FastForwardTeam/FastForward/issues/1363
    /short-ly.co/.test(url) ? afterDOMLoaded(function() {redirectIfExists('.btn-secondary')}) : null;

    // multimovies.uno
    //##Intermediate buttons
    const handleShamikcardButtons = (buttonSelector, targetText) => afterDOMLoaded(() => setInterval(() => { const button = document.querySelector(buttonSelector); if (button && button.textContent.includes(targetText) && !(targetText == 'Get Link')) { setTimeout(() => button.click(), 500); } }, 2000));
    /shramikcard.in/.test(url) ? handleShamikcardButtons('#topButton', 'Click to Continue') : null;
    /shramikcard.in/.test(url) ? handleShamikcardButtons('#topButton', 'Continue') : null;
    /shramikcard.in/.test(url) ? handleShamikcardButtons('#bottomButton', 'Click to Continue') : null;
    /shramikcard.in/.test(url) ? handleShamikcardButtons('#bottomButton', 'Continue') : null;
    //##Final button
    /shramikcard.in/.test(url) ? (() => afterDOMLoaded(() => setInterval(() => { const button = document.querySelector('#bottomButton'); if (button && button.textContent.includes('Get Link') && button.style.display === 'block') { setTimeout(() => button.click(), 2000); } }, 1000)))() : null; //Final button

    // ssrmovies.rent
    /blogging.techworldx.net/.test(url) ? clickIfVisible('.wait > center:nth-child(1) > img:nth-child(1)') : null;
    /blogging.techworldx.net/.test(url) ? clickIfVisible('#generater > img:nth-child(1)') : null;
    /blogging.techworldx.net/.test(url) ? clickIfVisible('#showlink') : null;

})();
// ----- ----- -----

