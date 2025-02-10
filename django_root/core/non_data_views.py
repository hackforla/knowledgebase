from allauth.socialaccount.models import SocialAccount
from django.shortcuts import render, redirect
from django.core.handlers.wsgi import WSGIRequest
from people_depot.sync import update_all_from_pd

def sync_view(request):
    print("debug syncing")
    update_all_from_pd(request.user)
    return redirect("/admin/")


def token_view(request):
    account = SocialAccount.objects.get(user=request.user)
    token = account.socialtoken_set.all().order_by("-expires_at").first()

    return render(request, "admin/token.html", {"token": token})


def social_signup_view(request: WSGIRequest):
    return render(request, "kb/socialsignup.html")
