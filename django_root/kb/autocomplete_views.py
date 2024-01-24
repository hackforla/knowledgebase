import json
from dal import autocomplete
from people_depot.models import User
from kb.models import AssetGroup


class UserAutocomplete(autocomplete.Select2QuerySetView):
    model = User
    search_fields = ["username"]
    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.user.is_authenticated:
            return User.objects.none()

        qs = User.objects.all()
        print("actor autocomplete")

        if self.q:
            qs = qs.filter(username__contains=self.q)

        return qs

class AssetGroupAutocomplete(autocomplete.Select2QuerySetView):
    model = AssetGroup
    # search_fields = ["title"]
    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.user.is_authenticated:
            return AssetGroup.objects.none()

        qs = AssetGroup.objects.all()

        if self.q:
            qs = qs.filter(name__contains=self.q)

        return qs

