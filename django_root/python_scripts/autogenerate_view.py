

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
        new_ending_text = file.read()
    new_ending_text = new_ending_text.replace("{model_name}", model_name)
    new_ending_text = new_ending_text.replace("{verbose_name_plural}", verbose_name_plural)
    new_ending_text = new_ending_text.replace("{verbose_name}", verbose_name)
    
    
    # Relative file path
    relative_file_path = 'kb/api/views.py'

    # Complete file path
    file_path = os.path.join(os.getcwd(), relative_file_path)
    print("Writing...")
    # Read existing content
    
    with open(file_path, 'r') as file:
        existing_content = file.read()
    
    start_index = existing_content.find("from kb.models")
    import_line = f"from kb.models import {model_name}\n"
    new_content = existing_content[:start_index] + import_line + existing_content[start_index:] + new_ending_text
         

    # Open the file in write mode
    with open(file_path, 'w') as file:
        # Write back the original content
        file.write(new_content)
        