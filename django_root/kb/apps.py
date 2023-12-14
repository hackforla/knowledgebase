from django.apps import AppConfig
from django.core.exceptions import FieldDoesNotExist


class kb_appConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "kb"
    
