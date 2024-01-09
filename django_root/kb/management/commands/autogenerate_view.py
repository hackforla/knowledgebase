from importlib import import_module
import os
import sys
from django.apps import apps
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Adds code to serializers.py to serialize a model."

    def add_arguments(self, parser):
        parser.add_argument("app_name", type=str)
        parser.add_argument("model_name", type=str)

    def handle(self, *__args__, **options):
        app_name = options["app_name"]
        model_name = options["model_name"]
        generate(app_name, model_name)


def generate(app_name, model_name):
    print(f"Generating view for {app_name}.{model_name}")

    model = apps.get_model(app_name, model_name)
    verbose_name_plural = model._meta.verbose_name_plural.__str__()
    verbose_name = model._meta.verbose_name.__str__()

    text_path = os.path.join(os.getcwd(), "kb/management/commands/view_template.txt")
    with open(text_path, "r") as file:
        new_ending_content = file.read()
    new_ending_content = new_ending_content.replace("{model_name}", model_name)
    new_ending_content = new_ending_content.replace(
        "{verbose_name_plural}", verbose_name_plural
    )
    new_ending_content = new_ending_content.replace("{verbose_name}", verbose_name)

    file_path = os.path.join(os.getcwd(), f"{app_name}/api/views.py")

    modified_content = ""
    with open(file_path, "r") as file:
        lines = file.readlines()
        for line in lines:
            modified_content += line
            if "from kb.models" in line:
                modified_content += f"    {model_name},\n"
            if "from .serializers" in line:
                modified_content += f"    {model_name}Serializer,\n"

    # Open the file in write mode
    with open(file_path, "w") as file:
        # Write back the original content
        file.write(modified_content + new_ending_content)

    print(f"View for {app_name}.{model_name} generated.")
