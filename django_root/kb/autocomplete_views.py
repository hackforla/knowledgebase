from dal import autocomplete
from people_depot.models import User
from kb.models import Asset

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

class AssetAutocomplete(autocomplete.Select2QuerySetView):
    model = Asset
    # search_fields = ["title"]
    def get_queryset(self):
        # Don't forget to filter out results depending on the visitor !
        if not self.request.asset.is_authenticated:
            return Asset.objects.none()

        qs = Asset.objects.all()

        if self.q:
            qs = qs.filter(title__contains=self.q)

        return qs

