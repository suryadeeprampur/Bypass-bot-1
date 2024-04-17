def modify_script(input_script_path, includes_file_path, output_script_path):
    # Read the content of the input script
    with open(input_script_path, 'r', encoding='utf-8') as input_file:
        script_lines = input_file.readlines()

    # Read the content of the includes file
    with open(includes_file_path, 'r', encoding='utf-8') as includes_file:
        includes_content = includes_file.read()

    # Delete lines non english description (because some characters show up with errors in some sites)
    script_lines = [s for s in script_lines if not (s.startswith("// @description:") or s.startswith("// @name:"))]

    # Delete lines with "@include" or "@match"
    script_lines = [line for line in script_lines if '@match' not in line and '@include' not in line]

    # Find the last line that starts with "// @description"
    last_description_line_index = None
    for i in range(len(script_lines) - 1, -1, -1):
        if script_lines[i].startswith('// @description'):
            last_description_line_index = i
            break

    # Insert includes
    script_lines.insert(last_description_line_index + 1, includes_content)

    # Write the modified script to the output file
    with open(output_script_path, 'w') as output_file:
        output_file.writelines(script_lines)

    print(f"OK: @Include lines added. Script successfully modified and saved to {output_script_path}.")

def does_not_contain_any(input_string, string_list):
    for string_to_check in string_list:
        if string_to_check in input_string:
            return False
    return True

def remove_lines_with_strings(js_code, strings_to_remove):
    lines = js_code.split('\n')
    filtered_lines = [line for line in lines if not any(s in line for s in strings_to_remove)]
    filtered_code = '\n'.join(filtered_lines)
    return filtered_code

def modify_script_extra(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

            #Change title
            content = content.replace("// @name       Bypass All Shortlinks", "// @name       Bypass All Shortlinks Debloated")
            content = content.replace("https://i.ibb.co/qgr0H1n/BASS-Blogger-Pemula.png", "https://cdn-icons-png.flaticon.com/512/14025/14025295.png")
            content = content.replace("@author     Bloggerpemula", "@author     Amm0ni4")
            content = content.replace("// @description    Bypass All Shortlinks Sites Automatically Skips Annoying Link Shorteners , Skip AdFly and No Annoying Ads, Directly to Your Destination, and now Support Auto Downloading Your Files",
                                      "// @description    Automatically bypass many link shorteners. Originally by BloggerPemula.\n// @homepageURL    https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated\n// @supportURL     https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/issues")

            #Change source URL
            content = content.replace("https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js",
                                      "https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js")
            
            content = content.replace("https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js",
                                      "https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.meta.js")
            
            content = content.replace("https://openuserjs.org/meta/Bloggerpemula/Bypass_All_Shortlinks_Manual_Captcha.meta.js",
                                      "https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.meta.js")

            # Fixes
            content = content.replace("case 'work.ink': if (/^\/([^\/]+)/.test(h.pathname))", "case 'work.ink': if (/^\/([^\/]+)/.test(h.pathname) && !location.href.includes('/token/') && !location.href.includes('?r=') && !location.href.includes('?ref='))")
            content = content.replace("adbypass.org/bypass?bypass=' + location.href.split('?')[0]", "adbypass.org/bypass?bypass=' + encodeURIComponent(location.href)")

            content = content.replace("ClickIfExists('#slu-continue')", "ClickIfExists('#btn-3')")

            content = content.replace("ReadytoClick('.btn-primary.btn-warningbtn.btn'", "ReadytoClick('#cbt'")

            code_to_replace = """$('form[id=go-link]').unbind().submit(function(e) {e.preventDefault();
        var form = $(this);var url = form.attr('action');const pesan = form.find('button'); const notforsale = $(".navbar-collapse.collapse");const blogger = $(".main-header");const pemula = $(".col-sm-6.hidden-xs");
        $.ajax({type: "POST", url: url, data: form.serialize(), beforeSend: function(xhr) {pesan.attr("disabled", "disabled");$('a.get-link').text('Bypassed by Bloggerpemula');
            notforsale.replaceWith('<button class="btn btn-default , col-md-12 text-center" onclick="javascript: return false;"><b>Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula</b></button>');
            blogger.replaceWith('<button class="btn btn-default , col-md-12 text-center" onclick="javascript: return false;"><b>Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula</b></button>');
            pemula.replaceWith('<button class="btn btn-default , col-md-12 text-center" onclick="javascript: return false;"><b>Thanks for using Bypass All Shortlinks Scripts and for Donations , Regards : Bloggerpemula</b></button>');},
          success: function(result, status, xhr) {if (xhr.responseText.match('(insfly|Insfly|linksly|cosmic-matter).pw|(freecrypto|freeltc|a-s-cracks).top|mdiskshortner.link|(oscut|exashorts).fun|bigbtc.win|gainl.ink|earnify.pro|clockads.in|(promo-visits|rexlink).site')) {location.href = result.url;} else {redirect(result.url);}}});});"""
            content = content.replace(code_to_replace, "")


            # Remove unused
            content = content.replace("// @connect        nocaptchaai.com\n", "")

            # Add "@noframes"
            if not "@noframes" in content:
                content = content.replace("\n// @version", "\n// @noframes\n// @version")

            #Remove tracking

            ## Remove redirection to tracking site
            content = content.replace("https://rotator.nurul-huda.sch.id/?BypassResults=", "")
            content = content.replace("https://free4u.nurul-huda.or.id/?BypassResults=", "")
            content = content.replace("blog = true", "blog = false")

            ## Remove tracking iframe being injected
            content = remove_lines_with_strings(content, ["https://menrealitycalc.com/"])

            ## Remove weird datalist "adcopy_response" injected
            strings_to_remove = [
                "    elementReady('[name=adcopy_response]')",
                "    const PHRASES = ['1.21 gigawatts'",
                "                     'heart break',",
                "                     'rolling stone'",
                "    const datalist = document.createElement('datalist')"
            ]
            content = remove_lines_with_strings(content, strings_to_remove)
            content += '\n}})();\n' # Add closing bracket


            ## Check known issues have been removed and remove antifeature label if corrected
            strings_to_check = [
                "rotator.nurul-huda.sch.id/?BypassResults=",
                "free4u.nurul-huda.or.id/?BypassResults=",
                "https://menrealitycalc.com/",
                "createElement('iframe')",
                "adcopy_response"
            ]
            if does_not_contain_any(content, strings_to_check):
                content = content.replace("\n// @antifeature    tracking", "")
            else:
                print("ERROR: TRACKING NOT REMOVED.")
                #open("Bypass_All_Shortlinks.user.js", "w").close() # Clear file
                return False

            # Check the code ends with a line jump
            if not content.endswith('\n'):
                content += '\n'

        # Write the modified content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)

        print("OK: Extra Modifications completed successfully.")

    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def generate_metadata_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    start_index = None
    end_index = None

    for i, line in enumerate(lines):
        if line.startswith("// ==UserScript=="):
            start_index = i
        elif line.startswith("// ==/UserScript=="):
            end_index = i
            break

    if start_index is not None and end_index is not None:
        metadata_lines = lines[start_index:end_index + 1]
        with open(output_file, 'w', encoding='utf-8') as f:
            f.writelines(metadata_lines)
        print("Metadata extracted successfully!")
    else:
        print("Could not find metadata in the input file.")



def main():
    input_script_path = 'untouched_Bypass_All_Shortlinks.user.js'
    includes_file_path = 'includes.txt'
    output_script_path = 'Bypass_All_Shortlinks.user.js'
    modify_script(input_script_path, includes_file_path, output_script_path)
    modify_script_extra(output_script_path)
    generate_metadata_file("Bypass_All_Shortlinks.user.js", "Bypass_All_Shortlinks.meta.js")

if __name__ == "__main__":
    main()
