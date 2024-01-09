from importlib import import_module
import os
import sys
from django.apps import apps

from django.core.management.base import BaseCommand

from utils.utils import read_lines_and_close


class Command(BaseCommand):
    help = "Adds APIs to urls.py for a model"

    def add_arguments(self, parser):
        parser.add_argument("app_name", type=str)
        parser.add_argument("model_name", type=str)

    def handle(self, *__args__, **options):
        app_name = options["app_name"]
        model_name = options["model_name"]
        generate(app_name, model_name)


def generate(app_name, model_name):
    model = apps.get_model(app_name, model_name)
    verbose_plural = model._meta.verbose_name_plural
    api_route = verbose_plural.replace(" ", "-").lower()
    verbose_name = model._meta.verbose_name
    api_name = verbose_name.replace(" ", "-").lower()

    text = (
        f'router.register(r"{api_route}", {model_name}ViewSet, basename="{api_name}")\n'
    )

    # Complete file path
    file_path = os.path.join(os.getcwd(), f"{app_name}/urls.py")
    print("writing")
    # Read existing content
    lines = read_lines_and_close(file_path)
    if any(model_name in line for line in lines):
        print(f"URLs for {app_name}.{model_name} already exist.")
        return 1
    import_added = False
    router_added = False
    with open(file_path, "w") as file:
        for line in lines:
            if not router_added and "router.register" in line:
                router_added = True
                file.write(text)
            file.write(line)
            if f"from {app_name}.api.views" in line and not import_added:
                import_added = True
                file.write(f"    {model_name}ViewSet,\n")
    print("done")
