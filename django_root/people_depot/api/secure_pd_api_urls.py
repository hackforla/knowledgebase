import os
import requests
from allauth.socialaccount.models import SocialToken
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")


@login_required
def call_people_depot_api(request):
    social_token = (
        SocialToken.objects.filter(account__user=request.user)
        .order_by("-expires_at")
        .first()
    )
    if not social_token:
        return HttpResponse("No social token found", status=400)

    access_token = social_token.token
    headers = {"Authorization": "Bearer " + access_token}
    url = PEOPLE_DEPOT_URL + "/api/v1/users"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        # Handle error response
        return HttpResponse(
            "Failed to send API request: " + response.text,
            status=response.status_code,
        )
    # Success
    print("Success")
    return HttpResponse("API Request sent successfully")
