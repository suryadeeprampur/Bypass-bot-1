def modify_script(input_script_path, includes_file_path, output_script_path):
    # Read the content of the input script
    with open(input_script_path, 'r') as input_file:
        script_lines = input_file.readlines()

    # Read the content of the includes file
    with open(includes_file_path, 'r') as includes_file:
        includes_content = includes_file.read()

    # Delete lines with "@include" or "@match"
    script_lines = [line for line in script_lines if '@match' not in line and '@include' not in line]

    # Find the last line that starts with "// @description:"
    last_description_line_index = None
    for i in range(len(script_lines) - 1, -1, -1):
        if script_lines[i].startswith('// @description:'):
            last_description_line_index = i
            break

    # Insert includes
    script_lines.insert(last_description_line_index + 1, includes_content)

    # Write the modified script to the output file
    with open(output_script_path, 'w') as output_file:
        output_file.writelines(script_lines)

    print(f"OK: @Include lines added. Script successfully modified and saved to {output_script_path}.")


def remove_lines_with_url(input_string, url):
    lines = input_string.split('\n')
    filtered_lines = [line for line in lines if url not in line]
    result_string = '\n'.join(filtered_lines)
    return result_string

def does_not_contain_any(input_string, string_list):
    for string_to_check in string_list:
        if string_to_check in input_string:
            return False
    return True

def modify_script_extra(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()

            #Change title
            content = content.replace("// @name       Bypass All Shortlinks", "// @name       Bypass All Shortlinks Debloated")

            #Change source URL
            content = content.replace("https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.user.js",
                                      "https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js")
            
            content = content.replace("https://update.greasyfork.org/scripts/431691/Bypass%20All%20Shortlinks.meta.js",
                                      "https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js")

            #Remove tracking

            ## Remove redirection to tracking site
            content = content.replace("https://rotator.nurul-huda.sch.id/?BypassResults=", "")
            content = content.replace("https://free4u.nurul-huda.or.id/?BypassResults=", "")
            content = content.replace("blog = true", "blog = false")

            ## Remove tracking iframe being injected
            content = remove_lines_with_url(content, "https://menrealitycalc.com/")

            ## Check known issues have been removed and remove antifeature label if corrected
            strings_to_check = [
                "rotator.nurul-huda.sch.id/?BypassResults=",
                "free4u.nurul-huda.or.id/?BypassResults=",
                "https://menrealitycalc.com/",
                "createElement('iframe')"
            ]
            if does_not_contain_any(content, strings_to_check):
                content = content.replace("\n// @antifeature    tracking", "")
            else:
                print("ERROR: TRACKING NOT REMOVED.")
                open("Bypass_All_Shortlinks.user.js", "w").close() # Clear file
                return False

        # Write the modified content back to the file
        with open(file_path, 'w') as file:
            file.write(content)

        print("OK: Extra Modifications completed successfully.")

    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def main():
    input_script_path = 'untouched_Bypass_All_Shortlinks.user.js'
    includes_file_path = 'includes.txt'
    output_script_path = 'Bypass_All_Shortlinks.user.js'
    modify_script(input_script_path, includes_file_path, output_script_path)
    modify_script_extra(output_script_path)

if __name__ == "__main__":
    main()
