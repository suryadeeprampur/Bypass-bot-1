Debloated fork of *bypass-all-shortlinks*.

Automatically bypass many link shorteners [(supported_sites.txt)](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/src/branch/main/supported_sites.txt)

## Install
**Install with [this link](https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js)**

(you need a userscript manager like [Violentmonkey](https://violentmonkey.github.io/) installed in your web browser)

## Improvements in this fork
- The script will be loaded only for the sites that are supported. (the original userscript is loaded in every site you visit which is not necessary).
- The script will not redirect to 'rotator.nurul-huda.sch.id' or 'free4u.nurul-huda.or.id' before your destination URL, which are intermediary sites set by the developer for [collecting analytics](https://i.ibb.co/D1zYG1v/topcountry17-04-2023.jpg) and showing ads.
- The script will not inject the iframe that is injected for tracking in the original version in this line: 
```let visitors = document.createElement('iframe');visitors.src = 'https://menrealitycalc.com/greasyfork';visitors.style.cssText = "width: 0%; height: 0%; border: none;";document.body.appendChild(visitors);let btz = bp('.banner-ad > script:nth-child(9)' || '.panel-body > script:nth-child(7)' || 'div.adb-top > script:nth-child(10)');```

Original script by *bloggerpemula*: [greasyfork.org/scripts/431691](https://greasyfork.org/scripts/431691)

## How I modify the original userscript
Executing these 3 python scripts in order:
- 1_download_untouched.py
- 2_generate_includes.py
- 3_patch.py
