from importlib import import_module
import os
from django.apps import apps

def doit(model_name):
    model = apps.get_model("kb", model_name)
    fields = [field.name for field in model._meta.get_fields() if not field.is_relation]
    fields_text = ""
    import_text = f"from kb.models import {model_name}\n"
    for field in fields:
        fields_text += f'            "{field}",'
        if field != fields[-1]:
            fields_text += "\n"

    id_text = ""
    if ("uuid" in fields):
        id_text += "uuid"
    else:
        id_text += "id"


    # Relative file path
    relative_file_path = 'kb/api/serializers.py'
    relative_text_path = 'python_scripts/serializer_template.txt'

    # Complete file path
    file_path = os.path.join(os.getcwd(), relative_file_path)
    text_path = os.path.join(os.getcwd(), relative_text_path)
    
    with open(text_path, 'r') as file:
        text_content = file.read()   
    text_content = text_content.replace("{model_name}", model_name)
    text_content = text_content.replace("{fields_text}", fields_text) 
    text_content = text_content.replace("{id_text}", id_text)

    # Read existing content
    with open(file_path, 'r') as file:
        existing_content = file.read()

    # Open the file in write mode
    with open(file_path, 'w') as file:
        # Write back the original content
        file.write(import_text)
        file.write(existing_content)
        file.write(text_content)
        
