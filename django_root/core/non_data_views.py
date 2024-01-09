from allauth.socialaccount.models import SocialAccount
from django.shortcuts import render
from django.core.handlers.wsgi import WSGIRequest


def token_view(request):
    account = SocialAccount.objects.get(user=request.user)
    token = account.socialtoken_set.all().order_by("-expires_at").first()

    return render(request, "admin/token.html", {"token": token})


def social_signup_view(request: WSGIRequest):
    return render(request, "kb/socialsignup.html")
