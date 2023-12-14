"""core URL Configuration

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
from django.core.handlers.wsgi import WSGIRequest
from core.non_data_views import token_view, social_signup_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('kb/socialsignup/', social_signup_view),
    path('kb/token/', token_view),
    re_path(r'^', include('kb.urls')),
]
