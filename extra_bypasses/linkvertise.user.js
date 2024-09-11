// ==UserScript==
// @name         Linkvertise Bypass
// @author       harryitz
// @description  https://github.com/FastForwardTeam/FastForward/commit/31bd3b0193e06b73d8c777d640b0970175bac816#diff-4b960ee94677b8b7a092fdc10412fcf4df7c1eeea35347ce95b8540f1b9eda60
// @include      /^(https?:\/\/)(?!(bypass.city|adbypass.org))(linkvertise.com|(linkvertise|link-to).net)/
// @run-at       document-start
// ==/UserScript==


// ----- Bypass Linkvertise ------
(function() {
    'use strict';

    if (/^(https?:\/\/)(?!(bypass.city|adbypass.org))(linkvertise.com|(linkvertise|link-to).net)/.test(window.location.href)) {

        //easy case
        let rParam = new URLSearchParams(window.location.search).get('r');
        if (rParam) {
            window.location.assign(atob(rParam));

        // hard case
        // (based on fix by harryitz: https://github.com/FastForwardTeam/FastForward/commit/31bd3b0193e06b73d8c777d640b0970175bac816#diff-4b960ee94677b8b7a092fdc10412fcf4df7c1eeea35347ce95b8540f1b9eda60)
        } else {

            // Function to handle the redirect logic
            async function handleRedirect(data) {
                if (data.currentTarget?.responseText?.includes('getDetailPageContent')) {
                    const response = JSON.parse(data.currentTarget.responseText);
                    const access_token = response.data.getDetailPageContent.access_token;
                    const ut = localStorage.getItem('X-LINKVERTISE-UT');
                    const linkvertise_link = location.pathname.replace(/\/[0-9]$/, '');
                    const regexMatch = linkvertise_link.match(/^\/(\d+)\/([\w-]+)$/);
                    if (!regexMatch) return;
                    const user_id = regexMatch[1];
                    const link_vertise_url = regexMatch[2];

                    const completeDetailRequest = await fetch(
                        `https://publisher.linkvertise.com/graphql?X-Linkvertise-UT=${ut}`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'operationName': 'completeDetailPageContent',
                                'variables': {
                                    'linkIdentificationInput': {
                                        'userIdAndUrl': {
                                            'user_id': user_id,
                                            'url': link_vertise_url
                                        }
                                    },
                                    'completeDetailPageContentInput': {
                                        'access_token': access_token
                                    }
                                },
                                'query': 'mutation completeDetailPageContent($linkIdentificationInput: PublicLinkIdentificationInput!, $completeDetailPageContentInput: CompleteDetailPageContentInput!) {\n  completeDetailPageContent(\n    linkIdentificationInput: $linkIdentificationInput\n    completeDetailPageContentInput: $completeDetailPageContentInput\n  ) {\n    CUSTOM_AD_STEP\n    TARGET\n    additional_target_access_information {\n      remaining_waiting_time\n      can_not_access\n      should_show_ads\n      has_long_paywall_duration\n      __typename\n    }\n    __typename\n  }\n}'
                            })
                        });
                    if (completeDetailRequest.status !== 200) return;
                    const completeDetailResponse = await completeDetailRequest.json();
                    const TARGET = completeDetailResponse.data.completeDetailPageContent.TARGET;
                    if (!TARGET) return;

                    const getTargetPageRequest = await fetch(
                        `https://publisher.linkvertise.com/graphql?X-Linkvertise-UT=${ut}`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'query': 'mutation getDetailPageTarget($linkIdentificationInput: PublicLinkIdentificationInput!, $token: String!) {\n  getDetailPageTarget(\n    linkIdentificationInput: $linkIdentificationInput\n    token: $token\n  ) {\n    type\n    url\n    paste\n    short_link_title\n    __typename\n  }\n}',
                                'variables': {
                                    'linkIdentificationInput': {
                                        'userIdAndUrl': {
                                            'user_id': user_id,
                                            'url': link_vertise_url
                                        }
                                    },
                                    'token': TARGET
                                }
                            })
                        }
                    );
                    if (getTargetPageRequest.status !== 200) return;
                    const targetPageResponse = await getTargetPageRequest.json();
                    const targetPageURL = targetPageResponse['data']['getDetailPageTarget']['url'];
                    if (targetPageURL === null || !targetPageURL || targetPageURL.trim() === "") {
                        window.location.href = 'https://adbypass.org/bypass?bypass=' + window.location.href;
                    } else {
                        window.location.href = targetPageURL;
                    }
                }
            }

            // Function to intercept XHR requests
            function interceptXHR() {
                const open = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function() {
                    this.addEventListener("load", function(data) {
                        handleRedirect(data);
                    });
                    open.apply(this, arguments);
                };
            }

            // Run the XHR interceptor
            interceptXHR();
        }
    }

})();
// ----- ------ ----------

