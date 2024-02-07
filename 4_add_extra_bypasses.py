import os

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


# Function to read and modify .js files
def process_js_files(folder_path, target_file):
    # Initialize lists to store lines to be added
    match_lines = []
    require_lines = []
    after_user_script_lines = []

    # Traverse through the files in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".js"):
            with open(os.path.join(folder_path, filename), 'r', encoding='utf-8') as f:
                lines = f.readlines()

                # Find lines with "@match" or "@include" or "@require"
                for line in lines:
                    if "@match" in line or "@include" in line:
                        match_lines.append(line)
                    if "@require" in line:
                        require_lines.append(line)

                # Find lines after "// ==/UserScript=="
                after_user_script = False
                for line in lines:
                    if after_user_script:
                        after_user_script_lines.append(line)
                    elif "// ==/UserScript==" in line:
                        after_user_script = True

    # Write gathered information to target_file
    with open(target_file, 'r+', encoding='utf-8') as f:
        content = f.readlines()
        exclude_index = next((i for i, line in enumerate(content) if "@exclude" in line), None)
        if exclude_index is not None:
            # Add match_lines and require_lines before the first @exclude line
            content = content[:exclude_index] + match_lines + require_lines + content[exclude_index:]
        # Add lines after "// ==/UserScript=="
        content.extend(after_user_script_lines)
        f.seek(0)
        f.writelines(content)

# Main function to execute the process
def main():
    fixes_folder = "./extra_bypasses"
    target_file = "Bypass_All_Shortlinks.user.js"
    process_js_files(fixes_folder, target_file)
    print("Modification complete.")
    generate_metadata_file("Bypass_All_Shortlinks.user.js", "Bypass_All_Shortlinks.meta.js")

if __name__ == "__main__":
    main()
