Debloated fork of *bypass-all-shortlinks*, originally created by *bloggerpemula*.

Automatically bypass many link shorteners [(supported_sites.txt)](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/supported_sites.txt)

## Install
**Install with [this link](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js)**

(you need a userscript manager like [ViolentMonkey](https://violentmonkey.github.io/) installed in your web browser)

## Improvements in this fork
- **No loading the script indiscriminately on every site.** The script will be loaded only for the sites that are supported. (the original userscript is loaded in every site you visit which is not necessary).
    - Note: I have removed the following as supported sites:
        - Youtube `*://*.youtube.com/shorts/*`_(@match)_ (which is used for redirecting shorts)
        - Google:
            - Drive/Docs `/^(https?:\/\/)(drive|docs)\.google\.com(\/.*)/`_(@include)_ (which is used for Auto-DL from Drive/Docs)
            - redirects `/^https?:\/\/(?:www\.)?google\.com\/url.*[?&]q=/`_(@include)_ (used for bypassing these redirects) 
            - Recaptcha `*://*/recaptcha/api2/*`_(@match)_ or `/^(?:https?:\/\/)?(?:www\.)?(?:google\.com|recaptcha\.net)\/recaptcha\/api2\/.*$/`_(@include)_ (used for Auto-Open of captchas in many sites).
        - Twitter `*://*.twitter.com/*`_(@match)_ Bypass redirects
        - TikTok `*://*.tiktok.com/*`_(@match)_ Bypass redirects
        - Facebook `*://*.facebook.com/*`_(@match)_ Bypass redirects
        - VK `*://*.vk.com/*`_(@match)_ Bypass redirects

        Not including these is to prevent some people from worrying about the script running on sensitive sites. These can be re-enabled manually in your userscript manager, adding the mentioned _matching rules_ in the script _settings_.
- **No useless added redirects.** The script will not redirect to `rotator.nurul-huda.sch.id` or `free4u.nurul-huda.or.id` before your destination URL, which are intermediary sites set by the developer for tracking / [collecting analytics](https://i.ibb.co/D1zYG1v/topcountry17-04-2023.jpg) and showing ads.
- **No injecting unnecesary tracking in every site**. 
    - The script will not inject that _iframe_ linking to `menrealitycalc.com`.
    - The script will not inject this weird _"adcopy_response"_. (I don't see a clear purpose for this, since it doesn't seem related in the script to any specific link shortener)
- **Removed non-latin non-unicode characters** to avoid potential bug warnings.
- **Added extra bypasses** from the [extra_bypasses](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/extra_bypasses) folder.

Original script by *bloggerpemula*: [greasyfork.org/scripts/431691](https://greasyfork.org/scripts/431691)

## How I modify the original userscript
Executing these 3 python scripts in order:
- 1_download_untouched.py
- 2_generate_includes.py
- 3_patch.py
- 4_add_extra_bypasses.py

## Help make this better
You can help by:
- Reporting issues to the original script in [greasyfork feedback](https://greasyfork.org/scripts/431691/feedback) or [openuserjs issues](https://openuserjs.org/scripts/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha/issues)
- Reporting issues here on the [issues](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues) tab. Post examples with the source link shortener and link source website. I will only add/fix content-sharing shortlinks, no faucet / crypto rewards.
- Suggesting to merge other scripts into this one.
- Editing/Adding code with pull requests.
- If while using uBlock Origin (recommended adblocker), a link shortener is showing ads or detecting you have adblock, report it [here](https://github.com/uBlockOrigin/uAssets/discussions/17361).

