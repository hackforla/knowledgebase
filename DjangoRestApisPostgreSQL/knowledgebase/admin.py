from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import Tutorial
admin.site.register(Tutorial)

