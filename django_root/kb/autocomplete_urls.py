from django.urls import re_path as url

from kb.autocomplete_views import (
    AssetCategoryAutocomplete,
    OrganizationAutocomplete,
    PracticeAreaAutocomplete,
    ToolAutocomplete,
    TopicAreaAutocomplete,
    UserAutocomplete,
    AssetGroupAutocomplete,
)

# importing forms instantiates widgets without explicitly importing a specific form
# from .forms import foo as __foo__

urlpatterns = [
    url(
        "user-autocomplete/$",
        UserAutocomplete.as_view(),
        name="user-autocomplete",
    ),
    url(
        "assetcategory-autocomplete/$",
        AssetCategoryAutocomplete.as_view(),
        name="assetcategory-autocomplete",
    ),
    url(
        "assetgroup-autocomplete/$",
        AssetGroupAutocomplete.as_view(),
        name="assetgroup-autocomplete",
    ),
    url(
        "organization-autocomplete/$",
        OrganizationAutocomplete.as_view(),
        name="organization-autocomplete",
    ),
    url(
        "practicearea-autocomplete/$",
        PracticeAreaAutocomplete.as_view(),
        name="practicearea-autocomplete",
    ),
    url(
        "topicarea-autocomplete/$",
        TopicAreaAutocomplete.as_view(),
        name="topicarea-autocomplete",
    ),
    url(
        "tool-autocomplete/$",
        ToolAutocomplete.as_view(),
        name="tool-autocomplete",
    ),
]
