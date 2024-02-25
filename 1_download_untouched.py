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
    content = content.replace("BypassedByBloggerPemula(/itscybertech.com", "//BypassedByBloggerPemula(/itscybertech.com")
    content = content.replace("BypassedByBloggerPemula(/linkvertise.com/", "//BypassedByBloggerPemula(/linkvertise.com/")
    content = content.replace("/stfly.cc|stfly.xyz|techtrendmakers.com|(blogbux|blogesque|exploreera).net/", "/stfly.cc|stfly.xyz|(techtrendmakers|gadnest).com|(blogbux|blogesque|exploreera).net/")
    
    content = content.replace("BypassedByBloggerPemula(/lootlinks", "//BypassedByBloggerPemula(/lootlinks")
    content = content.replace("let lln = bp('body > script');let lls", "//let lln = bp('body > script');let lls")
    
    content += "\n"

    with open(destination, 'w', encoding='utf-8') as file:
        file.write(content)

if __name__ == "__main__":
    url1 = "https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"
    url2 = "https://openuserjs.org/install/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.user.js"
    destination = "untouched_Bypass_All_Shortlinks.user.js"

    download_file(url1, destination)
    modify_file_with_my_fixes(destination)
