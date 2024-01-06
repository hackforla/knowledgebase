import os
import sys

model_name = sys.argv[1]
# Relative file path
relative_file_path = 'kb/admin.py'

# Complete file path
file_path = os.path.join(os.getcwd(), relative_file_path)

# Read existing content
with open(file_path, 'r') as file:
    lines = file.readlines()

# Open the file in write mode
parenthesis_found = False

admin_register_found = False
admin_register_written = False
model_found = False
with open(file_path, 'w') as file:
    # Write lines up to the desired position
    for line in lines:  
        if model_name in line:
          model_found = True
            
        if ")" in line and not parenthesis_found:
            parenthesis_found = True
            if not model_found:
                file.write(f"    {model_name},\n")
            model_found = False
            
        if "admin.site.register" in line:
            admin_register_found = True
        
        if admin_register_found and not admin_register_written and "admin.site.register" not in line:
            admin_register_written = True
            if not model_found:
                file.write(f"admin.site.register({model_name})\n")
        
        file.write(line)

    if not admin_register_written and not model_found:
        file.write(f"admin.site.register({model_name})\n")        
