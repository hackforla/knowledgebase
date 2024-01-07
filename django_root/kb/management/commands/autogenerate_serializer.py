import os
from django.apps import apps

from django.core.management.base import BaseCommand
class Command(BaseCommand):
    help = "Adds code to serializers.py to serialize a model."

    def add_arguments(self, parser):
         parser.add_argument('app_name', type=str)
         parser.add_argument('model_name', type=str)

    def handle(self, *__args__, **options):
        app_name = options['app_name']
        model_name = options['model_name']
        generate(app_name, model_name)

def generate(app_name, model_name):
    print(f"Generating serializer for {app_name}.{model_name}", )
    model = apps.get_model(app_name, model_name)

    fields = [field.name for field in model._meta.get_fields() if not field.is_relation]
    fields_text = ""
    for index, field in enumerate(fields):
        if index > 0:
            fields_text += ', '
        fields_text += f'"{field}"'

    primary_key = model._meta.pk.name

    # Relative file path
    relative_file_path = f"{app_name}/api/serializers.py"
    relative_template_path = 'python_scripts/serializer_template.txt'

    # Complete file path
    file_path = os.path.join(os.getcwd(), relative_file_path)
    template_path = os.path.join(os.getcwd(), relative_template_path)
    
    with open(template_path, 'r') as file:
        new_ending_text = file.read()   
    new_ending_text = new_ending_text.replace("{model_name}", model_name)
    new_ending_text = new_ending_text.replace("{fields_text}", fields_text) 
    new_ending_text = new_ending_text.replace("{primary_key}", primary_key)

    # Read existing content
    with open(file_path, 'r') as file:
        lines = file.readlines()

    modified_content = ""
    models_found = False
    right_paren_found = False
    for line in lines:
        if f"from {app_name}.models" in line and not models_found:
            models_found = True
        if ")" in line and models_found and not right_paren_found:
            right_paren_found = True
            modified_content += f"    {model_name},\n"
        modified_content += line
        

    with open(file_path, 'w') as file:
        file.write(modified_content + new_ending_text)
        
       
