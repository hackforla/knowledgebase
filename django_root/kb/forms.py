from django import forms

from dal import autocomplete

from django import forms

from django.contrib import admin
from kb.models.asset_models import Asset
from kb.models.manytomany_models import AssetUser

# widget for foreign key (1-M)
class AssetForm(forms.ModelForm):
    class Meta:
        model = Asset
        fields = ('__all__')
        widgets = {
            'asset_group': autocomplete.ModelSelect2(url='assetgroup-autocomplete'),
        }

# widget for foreign key (1-M) on an m-m table
class AssetUserForm(forms.ModelForm):
    class Meta:
        model = AssetUser
        fields = ('__all__')
        widgets = {
            'user': autocomplete.ModelSelect2(url='user-autocomplete'),
        }

# M-M
class AssetUsersInline(admin.TabularInline):
    form = AssetUserForm
    model = AssetUser       
    extra = 5

# inlines for M-M
class AssetAdmin(admin.ModelAdmin):
    # Asset fields to display and search
    form = AssetForm
    list_display = ("title", "slug", "phase", "published")
    list_filter = ["phase", "published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}

    # When combined with Asset, this will show
    inlines = [AssetUsersInline]


# M-M
class AssetInline(admin.TabularInline):
    model = Asset       
    extra = 2

# 1-M
class AssetGroupAdmin(admin.ModelAdmin):
    # Asset Group fields to display and search
    list_display = ("name",)
    search_fields = ["name","description"]

    # When combined with Asset, this will show
    inlines = [AssetInline]


