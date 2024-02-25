// ==UserScript==
// @name         loot-link.com bypasser by antiworkink
// @include      /(loot-link.com|loot-links.com|lootlink.org|lootlinks.co|lootdest.(info|org|com)|links-loot.com|linksloot.net)\/s\?.*$/
// @run-at       document-start
// ==/UserScript==

// ----- Bypass look-link ( based on https://greasyfork.org/scripts/483207, https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues/3) -----
(function() {
    'use strict';

    if (/(loot-link.com|loot-links.com|lootlink.org|lootlinks.co|lootdest.(info|org|com)|links-loot.com|linksloot.net)\/s\?.*$/.test(window.location.href)) {
        alert('Bypass for loot-link starting.\nKeep in mind: \n- You probably need to disable your adblocker.\n- It takes about 5-10s to work.')
        const window = unsafeWindow;
        lootlinkBypass();

        function lootlinkBypass(){
            let initData;
            let syncer;
            let sessionData;

            let origFetch = fetch;
            unsafeWindow.fetch = function (url, ...options) {
                return new Promise(async (resolve, reject) => {
                    try {
                        let res = await origFetch(url, ...options);
                        try {
                            if (url.includes(p.CDN_DOMAIN)) {
                                initData = res.clone();
                                initData = await initData.text();
                                initData = '[' + initData.slice(1, -2) + ']';
                                initData = JSON.parse(initData);
                                syncer = initData[10];
                            }
                            else if (url.includes(syncer) && !sessionData) {
                                sessionData = res.clone();
                                sessionData = await sessionData.json();
                                bypass();
                            }
                        } catch (e) {
                            console.error(e);
                            let reportError = confirm(`${e.message}\n${e.stack}\n\nwould you like to report this error?`);
                            if (reportError) {
                                navigator.clipboard.writeText(e.message + '\n' + e.stack);
                                window.location.replace('https://discord.gg/keybypass');
                            }
                            else {
                                window.location.reload();
                            }
                        }
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                });
            }

            async function bypass() {
                let urid = sessionData[0].urid;

                let server = initData[9];
                server = (Number(urid.toString().substr(-5)) % 3) + '.' + server;

                let websocket = new WebSocket(`wss://${server}/c?uid=${urid}&cat=${sessionData[0].task_id}&key=${p.KEY}`);
                fetch(sessionData[0].action_pixel_url)
                websocket.onopen = async function (event) {
                    await fetch(`https://${server}/st?uid=${urid}&cat=${sessionData[0].task_id}`, { method: 'POST', })
                    await fetch(`https://${syncer}/td?ac=1&urid=${urid}&&cat=${sessionData[0].task_id}&tid=${p.TID}`)
                };
                websocket.onmessage = function (event) {
                    if (event.data.startsWith('r:')) {
                        let data = event.data.split(':')[1];
                        data = decryptData(data);
                        window.location.assign(data);
                    }
                };
            }

            function decryptData(encodedData, keyLength = 5) {
                let decryptedData = '',
                    base64Decoded = atob(encodedData),
                    key = base64Decoded.substring(0, keyLength),
                    encryptedContent = base64Decoded.substring(keyLength);

                for (let i = 0; i < encryptedContent.length; i++) {
                    let charCodeEncrypted = encryptedContent.charCodeAt(i),
                        charCodeKey = key.charCodeAt(i % key.length),
                        decryptedCharCode = charCodeEncrypted ^ charCodeKey;

                    decryptedData += String.fromCharCode(decryptedCharCode);
                }

                return decryptedData;
            }
        }

    }

})();
// ----- ----- -----
