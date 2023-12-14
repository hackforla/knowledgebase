from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import (
    AssetGroup,
    Author,
    AssetGroupAuthor,
    AssetGroupAdmin,
    AuthorAdmin,
    Phase,
)

admin.site.register(AssetGroup, AssetGroupAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(AssetGroupAuthor)
admin.site.register(Phase)
