from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist


# Register your models here.
from .models import (
    AssetType,
    Asset,
    AssetGroup,
    AssetInlineAdmin,
    Phase,
    TopicArea,
)

admin.site.register(AssetType)
admin.site.register(AssetGroup)
admin.site.register(Asset, AssetInlineAdmin)
admin.site.register(Phase)
admin.site.register(TopicArea)
