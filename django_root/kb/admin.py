from django.contrib import admin

# Register your models here.
from .models import (
    AssetType,
    Asset,
    AssetGroup,
    AssetCategory,
    Phase,
    TopicArea,
    Usability,
)
from kb.forms import AssetAdmin, AssetTypeAdmin, AssetGroupAdmin

admin.site.register(AssetType, AssetTypeAdmin)
admin.site.register(AssetCategory)
admin.site.register(AssetGroup, AssetGroupAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(Phase)
admin.site.register(TopicArea)
admin.site.register(Usability)
