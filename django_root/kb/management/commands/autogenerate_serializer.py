import os
from django.apps import apps

from django.core.management.base import BaseCommand
class Command(BaseCommand):
    help = "Populates data from json files or people depot"

    def add_arguments(self, parser):
         parser.add_argument('model_name', nargs='+', type=str)

    def handle(self, *__args__, **options):
        model_name = options['model_name'][0]
        generate(model_name)

def generate(model_name):
    # Relative file path
    relative_file_path = 'kb/api/serializers.py'
    relative_template_path = 'python_scripts/serializer_template.txt'

    # Complete file path
    file_path = os.path.join(os.getcwd(), relative_file_path)
    template_path = os.path.join(os.getcwd(), relative_template_path)

    # Read existing content
    with open(file_path, 'r') as file:
        content = file.read()
    
    if content.find(model_name) != -1:
        print("Serializer already exists")
        return 1

    model = apps.get_model("kb", model_name)


    fields = [field.name for field in model._meta.get_fields() if not field.is_relation]
    fields_text = ""
    for field in fields:
        fields_text += f'            "{field}",'
        if field != fields[-1]:
            fields_text += "\n"


    id_text = ""
    if ("uuid" in fields):
        id_text += "uuid"
    else:
        id_text += "id"

    
    with open(template_path, 'r') as file:
        new_ending_text = file.read()   
    new_ending_text = new_ending_text.replace("{model_name}", model_name)
    new_ending_text = new_ending_text.replace("{fields_text}", fields_text) 
    new_ending_text = new_ending_text.replace("{id_text}", id_text)
    
    lines = content.split("\n")

    modified_content = ""
    for line in lines:
        modified_content += f"{line}\n"
        if "from kb.models" in line:
            modified_content += f"    {model_name},\n"
        

    with open(file_path, 'w') as file:
        file.write(modified_content + new_ending_text)
        
