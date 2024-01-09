import os
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Adds code to admin.py for a model."

    def add_arguments(self, parser):
        parser.add_argument("app_name", type=str)
        parser.add_argument("model_name", type=str)

    def handle(self, *__args__, **options):
        app_name = options["app_name"]
        model_name = options["model_name"]
        file_path = os.path.join(os.getcwd(), f"{app_name}/admin.py")
        generate(file_path, app_name, model_name)


def generate(file_path, app_name, model_name):
    # Read existing content
    print(f"Generating admin for {app_name}.{model_name}")
    with open(file_path, "r") as file:
        lines = file.readlines()
    if any(model_name in line for line in lines):
        print(f"Admin for {app_name}.{model_name} already exists.")
        return 1

    registered = False
    imported = False

    with open(file_path, "w") as file:
        # Write lines up to the desired position
        for line in lines:
            if "admin.site.register" in line and not registered:
                registered = True
                file.write(f"admin.site.register({model_name})\n")
            file.write(line)
            if ".models import" in line and not imported:
                imported = True
                file.write(f"    {model_name},\n")

    print("Done")
