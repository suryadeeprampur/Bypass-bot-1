// ==UserScript==
// @name        work.ink bypass
// @include     /(work.ink|workink.click)\/.*$/
// @require     https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js
// @run-at      document-start
// @grant          GM_getResourceText
// @grant          GM_addStyle
// ==/UserScript==

// ----- Bypass work.ink ---- original script by lem6ns: https://greasyfork.org/en/scripts/463481-work-ink-bypasser
(function() {
    'use strict';
    if (/(work.ink|workink.click)\/.*$/.test(window.location.href)) {
        // Overlay text "Bypassing..."
        setInterval(() => {if (!document.getElementById('bypassOverlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'bypassOverlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.5);padding:20px;z-index:9999;';
            overlay.innerHTML = '<h1 style="font-size:2em;color:white;margin:0;">Bypassing with userscript...(wait 2-3s) (use incognito or delete cookies if stuck)</h1>';
            document.body.appendChild(overlay);
        }}, 1000);

        document.addEventListener('DOMContentLoaded', function() {
            //--Original script starts here--
            const notyfCss = GM_getResourceText("NOTYF_CSS");
            GM_addStyle(notyfCss);
            const notyf = new Notyf({ duration: 5000 });

            (async () => {
                if (window.location.hostname.includes("r.")) window.location.hostname = window.location.hostname.replace("r.", "");
                if (window.location.hostname === "work.ink") {
                    const [encodedUserId, linkCustom] = decodeURIComponent(window.location.pathname.slice(1)).split("/").slice(-2);
                    const BASE = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    const loopTimes = encodedUserId.length;
                    let decodedUserId = BASE.indexOf(encodedUserId[0]);
                    for (let i = 1; i < loopTimes; i++) decodedUserId = 62 * decodedUserId + BASE.indexOf(encodedUserId[i]);

                    const payloads = {
                        social: (url) => JSON.stringify({
                            type: "c_social_started",
                            payload: {
                                url
                            }
                        }),
                        readArticles: {
                            1: JSON.stringify({
                                type: "c_monetization",
                                payload: {
                                    type: "readArticles",
                                    payload: {
                                        event: "start"
                                    }
                                }
                            }),
                            2: JSON.stringify({
                                type: "c_monetization",
                                payload: {
                                    type: "readArticles",
                                    payload: {
                                        event: "closeClicked"
                                    }
                                }
                            })
                        },
                        browserExtension: {
                            1: JSON.stringify({
                                type: "c_monetization",
                                payload: {
                                    type: "browserExtension",
                                    payload: {
                                        event: "start"
                                    }
                                }
                            }),
                            2: (token) => JSON.stringify({
                                type: "c_monetization",
                                payload: {
                                    type: "browserExtension",
                                    payload: {
                                        event: "confirm",
                                        token
                                    }
                                }
                            })
                        }
                    }

                    WebSocket.prototype.oldSendImpl = WebSocket.prototype.send;
                    WebSocket.prototype.send =
                        function (data) {
                            this.oldSendImpl(data);
                                this.addEventListener(
                                    "message",
                                    async (e) => {
                                        const sleep = ms => new Promise(r => setTimeout(r, ms));
                                        const data = JSON.parse(e.data);
                                        if (data.error) return;
                                        const payload = data.payload;

                                        switch (data.type) {
                                            case "s_link_info":
                                                notyf.success("got link info")
                                                if (payload.socials) socials.push(...payload.socials);
                                                const monetizationTypes = ["readArticles", "browserExtension"];
                                                for (const type of monetizationTypes) {
                                                    if (payload.monetizationScript.includes(type)) {
                                                        activeMonetizationTypes.push(type)
                                                    }
                                                }
                                                break;
                                            case "s_start_recaptcha_check":
                                                this.oldSendImpl(payloads.captcha);
                                                break;
                                            case "s_recaptcha_okay":
                                                if (socials.length) {
                                                    for (const [index, social] of socials.entries()) {
                                                        notyf.success(`performing social #${index+1}`)
                                                        this.oldSendImpl(payloads.social(social.url));
                                                        await sleep(3 * 1000);
                                                    }
                                                }

                                                if (activeMonetizationTypes.length) {
                                                    for (const type of activeMonetizationTypes) {
                                                        switch (type) {
                                                            case "readArticles":
                                                                notyf.success("reading articles...")
                                                                this.oldSendImpl(payloads.readArticles["1"]);
                                                                this.oldSendImpl(payloads.readArticles["2"]);
                                                                break;
                                                            case "browserExtension":
                                                                notyf.success("skipping browser extension step")
                                                                if (activeMonetizationTypes.includes("readArticles")) await sleep(11 * 1000);
                                                                this.oldSendImpl(payloads.browserExtension["1"])
                                                                break;
                                                        }
                                                    }
                                                }
                                                break;
                                            case "s_monetization":
                                                if (payload.type !== "browserExtension") break;
                                                this.oldSendImpl(payloads.browserExtension["2"](payload.payload.token))
                                                break;
                                            case "s_link_destination":
                                                notyf.success("done!")
                                                const url = new URL(payload.url);
                                                localStorage.clear(window.location.href);
                                                if (url.searchParams.has("duf")) {
                                                    window.location.href = window.atob(url.searchParams.get("duf").split("").reverse().join(""))
                                                };
                                                window.location.href = payload.url;
                                                break;
                                        }
                                    },
                                    false
                                );
                            this.send =
                                function (data) {
                                    this.oldSendImpl(data);
                                };
                        }
                        notyf.success("patched websocket")
                    let socials = [];
                    let activeMonetizationTypes = [];
                } else if (window.location.hostname == "workink.click") {
                    const uuid = new URLSearchParams(window.location.search).get("t")
                    fetch(`https://redirect-api.work.ink/externalPopups/${uuid}/pageOpened`);
                    await new Promise(r => setTimeout(r, 11 * 1000));
                    const { destination } = await fetch(`https://redirect-api.work.ink/externalPopups/${uuid}/destination`).then(r => r.json());
                    const url = new URL(destination);
                    if (url.searchParams.has("duf")) {
                        window.location.href = window.atob(url.searchParams.get("duf").split("").reverse().join(""))
                    };
                    window.location.href = destination;
                    notyf.success("wait 11 seconds")
                } else {
                    if (new URL(window.location.href).searchParams.has("duf")) {
                        var link = document.createElement("a");
                        link.referrerPolicy = "no-referrer";
                        link.rel = "noreferrer";

                        link.href = window.atob(new URL(window.location.href).searchParams.get("duf").split("").reverse().join(""));
                        link.click();
                    };
                }
            })();
            //--Original script ends here--
        });
    }
})();
// ----- ----- -----
