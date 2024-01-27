from django import forms

from dal import autocomplete

from django import forms

from django.contrib import admin
from kb.models.asset_models import Asset, AssetType
from kb.models.manytomany_models import AssetGroupTopicArea, AssetPracticeArea, AssetTool, AssetUser

# widget for foreign key (1-M)
class AssetTypeForm(forms.ModelForm):
    class Meta:
        model = AssetType
        fields = ('__all__')
        widgets = {
            'asset_category': autocomplete.ModelSelect2(url='assetcategory-autocomplete'),
        }

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

class AssetPracticeAreaForm(forms.ModelForm):
    class Meta:
        model = AssetPracticeArea
        fields = ('__all__')
        widgets = {
            'practice_area': autocomplete.ModelSelect2(url='practicearea-autocomplete'),
        }

class AssetToolForm(forms.ModelForm):
    class Meta:
        model = AssetTool
        fields = ('__all__')
        widgets = {
            'tool': autocomplete.ModelSelect2(url='tool-autocomplete'),
        }
        
class AssetGroupTopicAreaForm(forms.ModelForm):
    class Meta:
        model = AssetGroupTopicArea
        fields = ('__all__')
        widgets = {
            'topic_area': autocomplete.ModelSelect2(url='topicarea-autocomplete'),
        }

# M-M
class AssetUsersInline(admin.TabularInline):
    form = AssetUserForm
    model = AssetUser       
    extra = 2

class AssetPracticeAreasInline(admin.TabularInline):
    form = AssetPracticeAreaForm
    model = AssetPracticeArea       
    extra = 2

class AssetToolsInline(admin.TabularInline):
    form = AssetToolForm
    model = AssetTool       
    extra = 2

class AssetGroupTopicAreasInline(admin.TabularInline):
    form = AssetGroupTopicAreaForm
    model = AssetGroupTopicArea       
    extra = 2

# inlines for M-M
class AssetTypeAdmin(admin.ModelAdmin):
    # Asset fields to display and search
    form = AssetTypeForm

   


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
    search_fields = ["name","description"]

    # When combined with Asset, this will show
    inlines = [AssetInline, AssetGroupTopicAreasInline]


