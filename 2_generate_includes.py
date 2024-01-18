import re

def extract_regex_from_js(js_code):
    pattern1 = r'BypassedByBloggerPemula\((.*?),'
    matches1 = re.findall(pattern1, js_code)
    matches1 = [match.strip('/') for match in matches1]
    
    pattern2 = r"BloggerPemula\('([^']+)',"
    matches2 = re.findall(pattern2, js_code)
    #matches2 = ['/' + s + '/' for s in matches2]

    pattern3 = r"RemoveBp\('([^']+)',"
    matches3 = re.findall(pattern3, js_code)

    pattern4 = r'case \'(.*?)\':'
    matches4 = re.findall(pattern4, js_code)

    pattern5 = r"h\.href\.includes\('(.*?)'\)"
    matches5 = re.findall(pattern5, js_code)

    return matches1+matches2+matches3+matches4+matches5

def regex_to_include_line(regex):
    #regex = regex.strip("/")
    regex = '(' + regex + ')'
    include_line = "// @include /^(https?:\/\/)(.+)?" + regex + "(\/.*)/"
    include_line = include_line.replace( "\.*)(\/.*)/", "\.*)/" ) #clean excess in the regex

    return include_line

def generate_include_lines(regex_list):
    include_lines = []
    for regex in regex_list:
        include_line = regex_to_include_line(regex)
        include_lines.append(include_line)

    return include_lines

def write_to_file(filename, lines):
    with open(filename, 'w') as file:
        for line in lines:
            file.write(line + '\n')
    print(f"OK: Generated {filename}")

def compile_and_print(regex_strings):
    #for regex_string in regex_strings: print(regex_string)
    #write_to_file('regexs.txt', regex_strings)

    include_lines = generate_include_lines(regex_strings)
    print(f"OK: Generated {len(include_lines)} include lines.")
    
    #for line in include_lines: print(line)
    write_to_file('includes.txt', include_lines)

def filter_strings(input_list):
    filtered_list = [string for string in input_list if "." in string and len(string) >= 4]
    return filtered_list

def main():
    file_path = 'untouched_Bypass_All_Shortlinks.user.js'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            js_code = file.read()
            regex_strings = extract_regex_from_js(js_code)
            regex_strings = filter_strings(regex_strings)
            compile_and_print(regex_strings)
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
