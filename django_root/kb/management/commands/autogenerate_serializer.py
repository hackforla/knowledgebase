import os
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
    print(
        f"Generating serializer for {app_name}.{model_name}",
    )

    file_path = os.path.join(os.getcwd(), f"{app_name}/api/serializers.py")
    content_with_import = add_import_to_text(file_path, app_name, model_name)

    template_path = os.path.join(
        os.getcwd(), "kb/management/commands/serializer_template.txt"
    )
    serializer_text = get_serializer_text(template_path, app_name, model_name)
    if serializer_text == "":
        print(f"Serializer for {app_name}.{model_name} already exists.")
        return 1

    with open(file_path, "w") as file:
        file.write(content_with_import + serializer_text)

    return 0


def add_import_to_text(file_path, app_name, model_name):
    with open(file_path, "r") as file:
        lines = file.readlines()
    already_exists = any(model_name in line for line in lines)
    if already_exists:
        return ""

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
    return modified_content


def get_serializer_text(template_path, app_name, model_name):
    # set fields_text = list of fields in model
    model = apps.get_model(app_name, model_name)
    fields = [field.name for field in model._meta.get_fields() if not field.is_relation]
    fields_text = ""
    for index, field in enumerate(fields):
        if index > 0:
            fields_text += ", "
        fields_text += f'"{field}"'

    # set new_ending_text = text from serializer_template.txt
    with open(template_path, "r") as file:
        new_text = file.read()

    # set primary_key = primary key of model
    primary_key = model._meta.pk.name

    # replace {model_name}, {fields_text}, and {primary_key} in new_ending_text
    print("before", new_text)
    new_text = new_text.replace("{model_name}", model_name)
    new_text = new_text.replace("{fields_text}", fields_text)
    new_text = new_text.replace("{primary_key}", primary_key)
    print("after", new_text)
    return new_text
