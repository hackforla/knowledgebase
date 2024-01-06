from importlib import import_module
import os
import sys
from django.apps import apps


def doit(model_name):
    model = apps.get_model("kb", model_name)
    verbose_name_plural = model._meta.verbose_name_plural
    api_route = verbose_name_plural.replace(" ", "-").lower()
    verbose_name = model._meta.verbose_name
    api_name = verbose_name.replace(" ", "-").lower()
    

    text = f"""\
router.register(r"{api_route}", {model_name}ViewSet, basename="{api_name}")
"""

    # Relative file path
    relative_file_path = 'kb/urls.py'

    # Complete file path
    file_path = os.path.join(os.getcwd(), relative_file_path)
    print("writing")
    # Read existing content
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Open the file in write mode
    router_started = False
    with open(file_path, 'w') as file:
        file.write(f"from kb.api.views import {model_name}ViewSet\n")
        for line in lines:
            if not router_started and "router.register" in line:
                router_started = True
                file.write(text)
            file.write(line)


