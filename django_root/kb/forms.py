from django import forms

from dal import autocomplete

from django import forms

from django.contrib import admin
from kb.models.asset_models import Asset, AssetType
from kb.models.manytomany_models import (
    AssetGroupTopicAreas,
    AssetPracticeAreas,
    AssetTools,
    AssetUsers,
)


# widget for foreign key (1-M)
class AssetTypeForm(forms.ModelForm):
    class Meta:
        model = AssetType
        fields = "__all__"
        widgets = {
            "asset_category": autocomplete.ModelSelect2(
                url="assetcategory-autocomplete"
            ),
        }


class AssetForm(forms.ModelForm):
    class Meta:
        model = Asset
        fields = "__all__"
        widgets = {
            "asset_group": autocomplete.ModelSelect2(url="assetgroup-autocomplete"),
            "organization": autocomplete.ModelSelect2(url="organization-autocomplete"),
        }


# widget for foreign key (1-M) on an m-m table
class AssetUserForm(forms.ModelForm):
    class Meta:
        model = AssetUsers
        fields = "__all__"
        widgets = {
            "user": autocomplete.ModelSelect2(url="user-autocomplete"),
        }


class AssetPracticeAreaForm(forms.ModelForm):
    class Meta:
        model = AssetPracticeAreas
        fields = "__all__"
        widgets = {
            "practice_area": autocomplete.ModelSelect2(url="practicearea-autocomplete"),
        }


class AssetToolForm(forms.ModelForm):
    class Meta:
        model = AssetTools
        fields = "__all__"
        widgets = {
            "tool": autocomplete.ModelSelect2(url="tool-autocomplete"),
        }


class AssetGroupTopicAreaForm(forms.ModelForm):
    class Meta:
        model = AssetGroupTopicAreas
        fields = "__all__"
        widgets = {
            "topic_area": autocomplete.ModelSelect2(url="topicarea-autocomplete"),
        }


# M-M
class AssetUsersInline(admin.TabularInline):
    form = AssetUserForm
    model = AssetUsers
    extra = 2


class AssetPracticeAreasInline(admin.TabularInline):
    form = AssetPracticeAreaForm
    model = AssetPracticeAreas
    extra = 2


class AssetToolsInline(admin.TabularInline):
    form = AssetToolForm
    model = AssetTools
    extra = 2


class AssetGroupTopicAreasInline(admin.TabularInline):
    form = AssetGroupTopicAreaForm
    model = AssetGroupTopicAreas
    extra = 2


# inlines for M-M
class AssetTypeAdmin(admin.ModelAdmin):
    # Asset fields to display and search
    form = AssetTypeForm

    def get_category_name(self, obj):
        return obj.asset_category.name

    get_category_name.short_description = "Category"

    list_display = (
        "get_category_name",
        "name",
    )
    list_filter = [
        "asset_category__name",
    ]
    search_fields = [
        "asset_category__name",
        "name",
    ]


class AssetAdmin(admin.ModelAdmin):
    # Asset fields to display and search
    form = AssetForm
    list_display = ("title", "slug", "phase", "published")
    list_filter = ["phase", "published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}

    # When combined with Asset, this will show
    inlines = [AssetUsersInline, AssetPracticeAreasInline, AssetToolsInline]


# M-M
class AssetInline(admin.TabularInline):
    model = Asset
    extra = 2


# 1-M
class AssetGroupAdmin(admin.ModelAdmin):
    # Asset Group fields to display and search
    list_display = ("name",)
    search_fields = ["name", "description"]

    # When combined with Asset, this will show
    inlines = [AssetInline, AssetGroupTopicAreasInline]
