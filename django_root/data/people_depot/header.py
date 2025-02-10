import os
from allauth.socialaccount.models import SocialAccount



PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")


PEOPLE_DEPOT_API_KEY = os.environ.get("PEOPLE_DEPOT_API_KEY")
PEOPLE_DEPOT_API_SECRET = os.environ.get("PEOPLE_DEPOT_API_SECRET")
PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL")


class HeaderUtil:
    @staticmethod
    def prepare_headers(requesting_user):
        if not PEOPLE_DEPOT_URL:
            return {}
        account = SocialAccount.objects.get(user=requesting_user)
        print("social token", account.socialtoken_set.all().order_by("-expires_at"))
        token = account.socialtoken_set.all().order_by("-expires_at").first()
        print(f"debug token {token}", token)
        return {"Authorization": f"Bearer {token}"}
