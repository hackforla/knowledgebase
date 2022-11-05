from django.apps import AppConfig
from django.core.exceptions import FieldDoesNotExist


class KnowledgebaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "knowledgebase"
