from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import (
    PracticeArea,
    Tool,
)

admin.site.register(PracticeArea)
admin.site.register(Tool)
