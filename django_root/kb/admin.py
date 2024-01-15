from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist


# Register your models here.
from .models import (
    AssetType,
    Asset,
    AssetGroup,
    AssetUserAdmin,
    Phase,
    TopicArea,
)

admin.site.register(AssetType)
admin.site.register(AssetGroup)
admin.site.register(Asset, AssetUserAdmin)
admin.site.register(Phase)
admin.site.register(TopicArea)
