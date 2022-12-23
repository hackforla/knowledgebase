from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import Gdoc
admin.site.register(Gdoc)

