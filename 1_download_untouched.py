import requests

def download_file(url, destination):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        with open(destination, 'wb') as file:
            file.write(response.content)

        print(f"OK: File downloaded successfully as {destination}")

    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")

def modify_file_with_my_fixes(destination):
    with open(destination, 'r', encoding='utf-8') as file:
        content = file.read()

    # Fixes
    content = content.replace("BloggerPemula('highkeyfinance.com'", "//BloggerPemula('highkeyfinance.com'")
    content = content.replace("BypassedByBloggerPemula(/itscybertech.com", "/*BypassedByBloggerPemula(/itscybertech.com")
    content = content.replace("bp('#gtbtn2'))) {clearInterval(itscyber); window.fngo();}}, 1 * 1000);});", "bp('#gtbtn2'))) {clearInterval(itscyber); window.fngo();}}, 1 * 1000);});*/")
    content = content.replace("BypassedByBloggerPemula(/linkvertise.com/", "//BypassedByBloggerPemula(/linkvertise.com/")
    content = content.replace("/stfly.cc|stfly.xyz|techtrendmakers.com|(blogbux|blogesque|exploreera).net/", "/stfly.(cc|xyz|biz)|(techtrendmakers|gadnest|optimizepics).com|(blogbux|blogesque|exploreera).net/")
    content = content.replace("BloggerPemula('financeyogi.net'", "//BloggerPemula('financeyogi.net'")
    content = content.replace("case 'pixeldrain.com'", "//case 'pixeldrain.com'")

    content = content.replace("BypassedByBloggerPemula(/lootlinks", "//BypassedByBloggerPemula(/lootlinks")
    content = content.replace("let lln = bp('body > script');let lls", "//let lln = bp('body > script');let lls")

    content = content.replace("BypassedByBloggerPemula(/web1s.asia/", "/*BypassedByBloggerPemula(/web1s.asia/")
    #content = content.replace("bp(inp).value = decodeURIComponent(BpParamd.get('code')); ClickIfExists(btn,2); }}});", "bp(inp).value = decodeURIComponent(BpParamd.get('code')); ClickIfExists(btn,2); }}}); */")
    content = content.replace("window.location.assign(`${decodeURIComponent(BpParamd.get('wsa'))}?code=${tCode}`); clearInterval(gCode);}}, 2000);}});", "window.location.assign(`${decodeURIComponent(BpParamd.get('wsa'))}?code=${tCode}`); clearInterval(gCode);}}, 2000);}});*/")

    content = content.replace("(howifx|vocalley|financerites|yogablogfit|healthfirstweb|junkyponk).com", "(howifx|vocalley|financerites|yogablogfit|healthfirstweb|junkyponk|mythvista).com")

    content = content.replace("BypassedByBloggerPemula(/adclicker", "//BypassedByBloggerPemula(/adclicker")
    #content = content.replace("/adclicker\.*/", "/(adclicker.(io|info)|discoveryultrasecure.com)\/url\/\#/")
    content = content.replace("redirect(new URLSearchParams(adc).get('url'));} else {}});", "//redirect(new URLSearchParams(adc).get('url'));} else {}});")

    #content = content.replace("BypassedByBloggerPemula(/quesignifi.ca|tiktokcounter.net/", "/*BypassedByBloggerPemula(/quesignifi.ca|tiktokcounter.net/")
    #content = content.replace("ClickIfExists('#cbt', 5, 'setInterval');}});", "ClickIfExists('#cbt', 5, 'setInterval');}});*/")

    content = content.replace("BypassedByBloggerPemula(/djxmaza.in/", "//BypassedByBloggerPemula(/djxmaza.in/")
    content = content.replace("ClickIfExists('#downloadbtnf', 2);ClickIfExists", "//ClickIfExists('#downloadbtnf', 2);ClickIfExists")

    content = content.replace("BypassedByBloggerPemula(/newsbawa.com/, function() {ClickIfExists('#Verify-click-btn', 2);ClickIfExists('a#footer-btn.verify-btn', 3);});", "BypassedByBloggerPemula(/newsbawa.com/, function() {ClickIfExists('#Verify-click-btn', 0.3);ClickIfExists('a#footer-btn.verify-btn', 1);});")

    content = content.replace("/anhdep24.com|nguyenvanbao.com|xemsport.com|byboe.com/", "/(anhdep24|nguyenvanbao|xemsport|byboe|asideway).com/")

    content = content.replace("BloggerPemula('veganab.co'", "//BloggerPemula('veganab.co'")
    content = content.replace("atglinks|", "")

    content = content.replace("|vebma|majalahhewan).com/", "|vebma|majalahhewan).com|crm.cekresi.me|ai.tempatwisata.pro/")

    content = content.replace("case 'work.ink'", "//case 'work.ink'")

    content = content.replace("/(starxinvestor|hit-films|sevenjournals).com|(iisfvirtual|bookszone|learnmany).in/", "/(starxinvestor|hit-films|sevenjournals|funkeypagali|viewmyknowledge|wikifilmia|nayisahara|careersides).com|(iisfvirtual|bookszone|learnmany).in/")

    content = content.replace("azmath.info", "azmath.info|expertvn.com")

    content += "\n"

    with open(destination, 'w', encoding='utf-8') as file:
        file.write(content)

if __name__ == "__main__":
    url1 = "https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"
    url2 = "https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js"
    destination = "untouched_Bypass_All_Shortlinks.user.js"

    download_file(url1, destination)
    modify_file_with_my_fixes(destination)
