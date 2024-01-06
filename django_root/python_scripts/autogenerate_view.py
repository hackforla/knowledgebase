

from importlib import import_module
import os
import sys
from django.apps import apps

def doit(model_name):
    model = apps.get_model("kb", model_name)
    verbose_name_plural = model._meta.verbose_name_plural.__str__()
    verbose_name = model._meta.verbose_name.__str__()

    text_path = os.path.join(os.getcwd(), 'python_scripts/view_template.txt')
    with open(text_path, 'r') as file:
        new_ending_content = file.read()
    new_ending_content = new_ending_content.replace("{model_name}", model_name)
    new_ending_content = new_ending_content.replace("{verbose_name_plural}", verbose_name_plural)
    new_ending_content = new_ending_content.replace("{verbose_name}", verbose_name)
    
    
    relative_file_path = 'kb/api/views.py'
    file_path = os.path.join(os.getcwd(), relative_file_path)
    print("Writing...")
    
    modified_content = ""
    kb_models_import_found = False
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            modified_content += line
            if "from kb.models" in line and not kb_models_import_found:
                kb_models_import_found = True
                modified_content += f"    {model_name},\n"
            if "from kb.serializers" in line:
                modified_content += f"    {model_name}Serializer\n"
            modified_content += line
                     

    # Open the file in write mode
    with open(file_path, 'w') as file:
        # Write back the original content
        file.write(modified_content+new_ending_content)
        