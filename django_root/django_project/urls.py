"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from allauth.socialaccount.models import SocialAccount
from django.shortcuts import render
from django.urls import path, re_path, include

def token_view(request):
    account = SocialAccount.objects.get(user=request.user) 
    token = account.socialtoken_set.all().order_by('-expires_at').first()

    return render(request, 'admin/token.html', { 'token': token })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('token/', token_view),
    re_path(r'^', include('django_kb_app.urls')),
]
