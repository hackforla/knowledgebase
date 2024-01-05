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
router.register(r"{api_route}", TopicAreaViewSet, basename="{api_name}")
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
    url_exists = False
    with open(file_path, 'w') as file:
        for line in lines:
            if url_exists and "router.register" not in line:
                file.write(text)
            url_exists = "router.register" in line

        
