from django import forms

from dal import autocomplete

from django import forms

from django.contrib import admin
from kb.models.asset_models import Asset, AssetGroup
from kb.models.manytomany_models import AssetUser


class AssetUserForm(forms.ModelForm):
    class Meta:
        model = AssetUser
        fields = ('__all__')
        widgets = {
            'user': autocomplete.ModelSelect2(url='user-autocomplete')
        }

class AssetUsersInline(admin.TabularInline):
    form = AssetUserForm
    model = AssetUser       
    extra = 5

class AssetAdmin(admin.ModelAdmin):
    # Asset fields to display and search
    list_display = ("title", "slug", "phase", "published")
    list_filter = ["phase", "published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}

    # When combined with Asset, this will show
    inlines = [AssetUsersInline]


class AssetInline(admin.TabularInline):
    model = Asset       
    extra = 2

class AssetGroupAdmin(admin.ModelAdmin):
    # Asset Group fields to display and search
    list_display = ("name",)
    search_fields = ["name","description"]

    # When combined with Asset, this will show
    inlines = [AssetInline]


