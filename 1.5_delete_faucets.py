
todelete1 ="""
    BypassedByBloggerPemula(/bitcoinfaucet.fun|freebitcoin.win/, function() {
      ClickIfExists('#continue2', 3, 'setInterval');ClickIfExists('#continue', 4, 'setInterval');});
"""

todelete2 ="""
    BypassedByBloggerPemula(/firefaucet.win/, function() {if (elementExists('#captcha-hcaptcha') || elementExists('#captcha-recaptcha') || elementExists('#captcha-turnstile')) {
        let ff = setInterval(() => {if (Captchacheck()) {ClickIfExists('#get_reward_button');
            ClickIfExists('button.btn.waves-effect.waves-light.earn-btns.gr');}}, 2 * 1000);} else {ClickIfExists('#get_reward_button', 1);}});
"""

todelete3 ="""
    BypassedByBloggerPemula(/(theconomy|nightfaucet).me|(imagenesderopaparaperros|linclik|up4cash|smoner).com|happy-living.online|galaxy-link.space|oke.io|bitss.sbs|(forextrader|foxylinks).site/, function() {
      if (elementExists('#link-view')) {let srl = setInterval(() => {if (Captchacheck()) {ClickIfExists('#invisibleCaptchaShortlink');}}, 1 * 1000);}});
"""

todelete4 ="""
    BypassedByBloggerPemula(/(exactpay|dinheirocrypto).online|videoclip.info|sproutworkers.co|coinsfaucet.fun/, function() {EnableRCF();window.onscroll = BpBlock();window.check2();if (elementExists('#verify')) {
        $('.blog-details').text('Please Answer the Maths Questions First ,Wait until Progress bar end, then Click the Red X Manually');
        elementReady('[name="answer"]').then(function(element) {element.addEventListener('change', window.check3);});}});
"""

todelete5 ="""
    BypassedByBloggerPemula(/(blogginglass|arahtekno|mopahealth).com|faucet.work|wildblog.me|jiotech.net|apkupload.in/, function() {
      var el = document.querySelector("input[name=newwpsafelink]");redirect(JSON.parse(atob(el.value)).linkr);});
"""

todelete6 ="""
    BypassedByBloggerPemula(/(awgrow|fadedfeet|kenzo-flowertag|homeculina|ineedskin|alightmotionlatest).com|worldtanr.xyz|lawyex.co|yexolo.net|mdn.lol/, () => {EnableRCF();window.urlPattern = false;window.addEventListener('DOMContentLoaded', () => {BypassHD("form:not([style*='display: none'])", 19);});});
"""

todelete7 ="""
    BypassedByBloggerPemula(/dutchycorp.space|dutchycorp.ovh|gtlink.co|seulink.digital|oii.io|hamody.pro|fileku.net|metasafelink.site|(beingtek|fc-lc|atglinks|10short).com|(zagl|shrinkforearn).in|(kiiw|wordcounter).icu|pwrpa.cc|shurt.pw|flyad.vip|antonimos.de|seulink.online/, function() {
      if (elementExists('.grecaptcha-badge') || elementExists('#captchaShortlink')) {var ticker = setInterval(function() {try {clearInterval(ticker); window.grecaptcha.execute();} catch (e) {}}, 3000);}});
    BypassedByBloggerPemula(/dutchycorp.ovh|beast.ink|ckk.ai|onelinks.nl|(viewfr|shortzon|techsamir|ufacw|gawbne|bitcoinwinco|liinkat|links.apksvip|namaidani|cutpaid|link1s|postazap|yeifly|kiddyshort|atglinks|shtfly|cortaly|makemoneywithurl|mtraffics|dz4link|dz-linkk).com|(tmearn|namaidani|cutearn|ccurl|link3s|youshort|illink).net|(s2fly|pglink|snaply|megaurl|megafly|linksbanao).in|(wez|shortlinks).info|(shrink|flyzu).icu|(oko|aii).sh|(24payu|vielink).top|(terafly|hatelink|cashando|zumpa|tlin|weezo|adnews|botfly|linkdam|ar-goal).me|(jameeltips|mitly).us|(forexly|goldly|insurancly).cc|(beycoin|aku2x|moinsider|satoshi-win).xyz|(wedocrypto|yourtechnology|clickmais|flylinks).online|(short1|urlcash|dglinks).site|(shrinkme|tfly).link|(playstore|adsy|clik|shurt).pw|short.express|cryptosh.pro|goo.st|tinygo.co|pndx.live|payskip.org|cryptotracker.space|shortearn.eu|clicklink.fun|lootcash.vip/, function() {parent.open = BpBlock();
       if (elementExists('.g-recaptcha') || elementExists('#captchaShortlink')) {let frm = setInterval(() => {if (Captchacheck()) {clearInterval(frm);SubmitIfExists('#link-view');}}, 1 * 1000);} else {let FMode = ['#link-view', '#form-continue', '.col-md- > form', '#nextstepform', '#submit-form', '.text-center.row > form', 'div.col-md-6 form', 'div.col-md-12 form', 'div.text-center form', '#before-captcha', '#yuidea', '#exfoary-form', '#submit_first_page', '#hidden form', '#test', 'form.text-center'];for (let i = 0; i < FMode.length; i++) {SubmitIfExists(FMode[i],2);}}});
    BypassedByBloggerPemula(/autofaucet.dutchycorp.space/, function() {let autoRoll = false; if (window.location.href.includes('/roll.php')) {window.scrollTo(0, 9999);
        if (!bp('#timer')) {setInterval(() => {if (Captchacheck()) {if (bp('.boost-btn.unlockbutton') && autoRoll === false) {bp('.boost-btn.unlockbutton').click();autoRoll = true;}
        if (Checkvisibility(bp('#claim_boosted'))) {bp('#claim_boosted').click();}}}, 3 * 1000);} else { setTimeout(() => {window.location.replace('https://autofaucet.dutchycorp.space/coin_roll.php');}, 3 * 1000);}}
        if (window.location.href.includes('/coin_roll.php')) {window.scrollTo(0, 9999);if (!bp("#timer")) {setInterval(() => {if (Captchacheck()) {
        if (bp('.boost-btn.unlockbutton') && autoRoll === false) {bp('.boost-btn.unlockbutton').click();autoRoll = true;}
        if (Checkvisibility(bp('#claim_boosted'))) {bp('#claim_boosted').click();}}}, 3 * 1000);} else { setTimeout(() => {window.location.replace('https://autofaucet.dutchycorp.space/ptc/wall.php');}, 3 * 1000);}}
        if (window.location.href.includes('/ptc/wall.php')) {var ptcwall = BpAll(".col.s10.m6.l4 a[name='claim']");
        if (ptcwall.length >= 1) {ptcwall[0].style.backgroundColor = 'red'; let match = ptcwall[0].onmousedown.toString().match(/'href', '(.+)'/);let hrefValue = match[1];
          setTimeout(() => {window.location.replace('https://autofaucet.dutchycorp.space' + hrefValue);}, 3 * 1000);} else {
          if (Checkvisibility !== null) {setTimeout(() => {window.location.replace('https://autofaucet.dutchycorp.space/ptc/');}, 3 * 1000);}}}
      if (location.href.includes('autofaucet.dutchycorp.space/ptc/')) {console.log('Viewing Available Ads');
        if (elementExists('.fa-check-double')) {console.log('All Available Ads Watched'); setTimeout(() => {window.location.replace('https://autofaucet.dutchycorp.space/dashboard.php');}, 3 * 1000);}
        setInterval(() => {if (Checkvisibility(bp('#submit_captcha'))) {bp("button[type='submit'].g-recaptcha").click();}}, 5 * 1000);}});
"""

def remove_lines_with_strings_without_exclude(input_string, forbidden_strings):
    lines = input_string.split('\n')
    filtered_lines = [line for line in lines if "@exclude" in line or not any(fs in line for fs in forbidden_strings)]
    return '\n'.join(filtered_lines)

def modify_script(input_path, output_path):

    with open(input_path, 'r', encoding='utf-8') as file:
        content = file.read()

    content = content.replace(todelete1, '\n')
    content = content.replace(todelete2, '\n')
    content = content.replace(todelete3, '\n')
    content = content.replace(todelete4, '\n')
    content = content.replace(todelete5, '\n')
    content = content.replace(todelete6, '\n')
    content = content.replace(todelete7, '\n')

    crypto_reward_sites = ['faucet', 'mdn.101', 'awgrow.com', 'worldtanr.xyz', 'fadedfeet.com', 'kenzo-flowertag.com', 'homeculina.com', 'lawyex.co', 'yexolo.net', 'ineedskin.com', 'tunebug.com', 'rsinsuranceinfo.com', 'rssoftwareinfo.com', 'rsfinanceinfo.com', 'rseducationinfo.com', 'rsadnetworkinfo.com', 'rshostinginfo.com', 'bitcosite.com', 'vegan4k.com', 'healthyfollicles.com', 'crewbase.net', 'shinchu.net', 'chefknives.expert', 'gametechreviewer.com', 'batmanfactor.com', 'allcryptoz.net', 'vrtier.com', 'gearsadviser.com', 'misterio.ro', 'phineypet.com', 'edonmanor.com', 'shinchu.net']

    content = remove_lines_with_strings_without_exclude(content, crypto_reward_sites)

    # Write the modified content back to the file
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(content)

    print("OK: Faucet sites removed.")



def main():
    modify_script(input_path='untouched_Bypass_All_Shortlinks.user.js', output_path='nofaucet_Bypass_All_Shortlinks.user.js',)

if __name__ == "__main__":
    main()
