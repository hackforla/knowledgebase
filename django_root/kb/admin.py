from django.contrib import admin

# Register your models here.
from .models import (
    AssetType,
    Asset,
    AssetGroup,
    Phase,
    TopicArea,
)
from kb.forms import AssetAdmin, AssetGroupAdmin

admin.site.register(AssetType)
admin.site.register(AssetGroup, AssetGroupAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(Phase)
admin.site.register(TopicArea)
