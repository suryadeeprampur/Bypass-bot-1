A fork of *Bypass All Shortlinks* (originally by *bloggerpemula*), with some additional bypasses and fixes.

Save time with automation or bypasses for many link shorteners.
([supported shorteners](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/supported_sites.txt)) ([changelog](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/commits/branch/main/Bypass_All_Shortlinks.user.js))

## Install
**Install with [this link](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js)**

(you need a userscript manager like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/) installed in your web browser)

## FAQ
- **How effective is this?** It depends on each website. Sometimes it can bypass completely, sometimes it only accelerates the timers, other times it can only auto-click the buttons for you after waiting for the timers to run out. People who contribute here need to add new specific code for each website after we find the vulnerabilities.
- **Why is this called "debloated" when now it's a bigger script than the original one?** Initially I just wanted to remove the extra ads and tracking that the original script used to have. Then I started to support a lot more websites, so the script is bigger. I guess I could change the name but I'm not sure that's practical at this point so I'm keeping the name for now.
- **What are *shortlinks*, where do I need this script if at all?** The type of *shortlinks* or *link shorteners* that we care about here are intermediate pages that users are forced to go through before getting to the page that we really want. They often force you to click ads so that the person posting these links can make a bit of money, 1 or 2 cents, each time somebody clicks them. This is used often in [p1r4cy websites that offer direct downloads](https://fmhy.net/downloadpiracyguide#video-sites).
- **How do I use the settings menu this script has?** I would leave all those settings on default, some can break some sites. When I see that one of those is useful for a site, I enable it for that site (even if it doesn't show on the menu). That menu was added by bloggerpemula, the original dev, and I simply left it there, but I don't use it myself.

## Improvements in this fork
- **Added more bypasses and some fixes** through the scripts in the [extra_bypasses](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/extra_bypasses) directory.
- **No loading the script indiscriminately on every site.** The script will be loaded only for the sites that are supported (the original userscript is loaded in most of the sites you visit, which is not necessary). Also, by default the script won't run on some sites that have optional bypasses made, but are sensitive like YouTube or Google. These can be re-enabled manually in your userscript manager, adding [optional matching rules](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/docs/optional_matching_rules.md) in the script _settings_.
- **Removed non-latin non-unicode characters** to avoid potential bug warnings.

BloggerPemula recently removed these tracking antifeatures in the original script too:
- _No added tracking redirects. The script will not redirect to `rotator.nurul-huda.sch.id` or `free4u.nurul-huda.or.id` which are sites set by the developer for tracking / [collecting analytics](https://i.ibb.co/D1zYG1v/topcountry17-04-2023.jpg) and showing ads. Note: removing this could break "faucet" (crypto rewards) sites, according to Bloggerpemula, since they add a sometimes necessary delay. I don't try to support those sites with this fork._
- _No injecting tracking in every site._
    - _The script will not inject that _iframe_ linking to `menrealitycalc.com`. (Recently, this _iframe_ was removed from the OpenUserJS version, and was only present in the GreasyFork version.)
    _Tip: this can be avoided in the original script adding this filter to uBlock Origin: `||menrealitycalc.com^$third-party`__
    - _The script will not inject this weird _"adcopy_response"_. (I don't see a clear purpose for this, since it doesn't seem related in the script to any specific link shortener)_

Original script by *Bloggerpemula*: [Bypass All Shortlinks | GreasyFork](https://greasyfork.org/scripts/431691) / [OpenUserJS](https://openuserjs.org/scripts/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha)

## How I modify the original userscript
Executing these python scripts in order:
- 1_download_untouched.py
- 2_generate_includes.py
- 3_patch.py
- 4_add_extra_bypasses.py

## Help make this better
You can help by:
- Reporting issues to the original script in [GreasyFork feedback](https://greasyfork.org/scripts/431691/feedback) or [OpenUserJS issues](https://openuserjs.org/scripts/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha/issues) (before doing this, check the issue is present in the original script)
- Reporting issues here on the [issues](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues) tab. Post examples with the source link shortener and link source website. I want to always know what type of content the shortlink leads to before putting time into it. NSFW is acceptable. I will only add/fix content-sharing shortlinks, no faucet / crypto rewards.
- Suggesting to merge other scripts into this one.
- Editing/Adding code with pull requests.
- If while using uBlock Origin (recommended adblocker), a link shortener is showing ads or detecting you have adblock, report it [here](https://github.com/uBlockOrigin/uAssets/discussions/17361).

## Credits
This script contains code I took, or redirects to free services from other developers for certain bypasses.
Thanks to:
- [BloggerPemula](https://greasyfork.org/users/810571-bloggerpemula)
- [bypass.city](https://bypass.city/) / [2](https://adbypass.org/) used for l1nkv3rt1s3, Admaven and Loot-link.
- Contributers to this repository who have submitted pull requests: Anon991299, mouro, trapgod1, CaptainCaffeine, IntNinja, Dxian.
- [StephenP](https://greasyfork.org/users/104167-stephenp) for the filecrypt bypass.
- [Rust1667](https://greasyfork.org/users/980489-rust1667) for some bypasses.
- [AdamWr](https://github.com/AdamWr) from AdGuard for the mega-enlace and acortalink.me bypasses.
- Every user that has reported issues to this repository.

## Optional extra tools
- For AdMaven links (example: `best-links.org/s?...`), these can't be easily bypassed with an userscript, because the page redirects you before the userscript has the chance to run. I recommend the browser extension [Redirector](https://einaregilsson.com/redirector/). 
Create a new redirect rule. Use the following settings: 
    - Include pattern: `^https:\/\/([^\/]*)\/s\?([a-zA-Z0-9]{1,8})$`
    - Redirect to: `https://bypass.city/bypass?bypass=https://$1/s?$2`
    - Pattern Type: `Regular expression`
