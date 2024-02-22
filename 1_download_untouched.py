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

    content = content.replace("BloggerPemula('highkeyfinance.com'", "//BloggerPemula('highkeyfinance.com'")
    content = content.replace("adbypass.org/bypass?bypass=' + location.href.split('?')[0]", "adbypass.org/bypass?bypass=' + encodeURIComponent(location.href)")
    content = content.replace("BypassedByBloggerPemula(/itscybertech.com", "//BypassedByBloggerPemula(/itscybertech.com")
    content = content.replace("BypassedByBloggerPemula(/linkvertise.com/", "//BypassedByBloggerPemula(/linkvertise.com/")
    content = content.replace("BypassedByBloggerPemula(/mirrored.to", "//BypassedByBloggerPemula(/mirrored.to")

    with open(destination, 'w', encoding='utf-8') as file:
        file.write(content)

if __name__ == "__main__":
    url = "https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js"
    destination = "untouched_Bypass_All_Shortlinks.user.js"

    download_file(url, destination)
    modify_file_with_my_fixes(destination)
