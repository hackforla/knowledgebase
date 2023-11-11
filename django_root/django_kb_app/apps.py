from django.apps import AppConfig
from django.core.exceptions import FieldDoesNotExist


class DjangoKbAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "django_kb_app"
