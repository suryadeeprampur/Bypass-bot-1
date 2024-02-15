// ==UserScript==
// @name        simple redirects
// @include     /mundopolo.net/
// @include     /comohoy.com/
// @include     /sphinxanime.com\/short/
// @include     /link.manudatos.com\/#!/
// @include     /(iconicblogger.com|segurosdevida.site)/
// @include     /link.unlockner.com/
// @include     /cybercityhelp.in/
// @include     /www.akcartoons.in/
// @include     /go.moonlinks.in/
// @run-at      document-start
// ==/UserScript==

// ----- Simple redirects -----
(function() {
    'use strict';
    const url = window.location.href
    const redirect = finalUrl => window.location.assign(finalUrl);
    const isValidUrl = url => { try { new URL(url); return true; } catch (error) { return false; } };
    const redirectIfNotDisabled = (selector) => { let intervalId = setInterval(() => { let linkButton = document.querySelector(selector + ':not(.disabled)'); if (linkButton) { clearInterval(intervalId); redirect(linkButton.href); } }, 500); };
    const afterDOMLoaded = (callback) => document.addEventListener('DOMContentLoaded', callback);

    //peliculasgd.net
    /mundopolo.net/.test(url) ? redirect(decodeURIComponent(atob(atob(atob(url.split('#!')[1]))))) : null;

    //leak.sx & pornleaks.in
    /comohoy.com/.test(url) ? redirect(atob(url.split('?url=')[1])) : null;

    //sphinxanime.com
    /sphinxanime.com\/short/.test(url) ? redirect(atob(url.split('?anonym=')[1])) : null;

    //pasteprivado.blogspot.com
    /link.manudatos.com\/#!/.test(url) ? redirect(atob(atob(atob(url.split('#!')[1])))) : null;

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

})();
// ----- ----- -----

