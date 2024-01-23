from django.urls import re_path as url

from kb.autocomplete_views import UserAutocomplete

# importing forms instantiates widgets without explicitly importing a specific form
# from .forms import foo as __foo__

urlpatterns = [
    url(
        "user-autocomplete/$",
        UserAutocomplete.as_view(),
        name="user-autocomplete",
    ),
]
