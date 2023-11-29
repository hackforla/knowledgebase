# custom_adapter.py
from django.shortcuts import redirect
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.models import SocialLogin

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    
    def pre_social_login(self, __request__, sociallogin: SocialLogin ):
        # Check if the user already exists in your PostgreSQL database
        if not sociallogin.is_existing:
            provider = sociallogin.account.provider  
            redirect_url = f'../../../../kb/socialsignup/?provider={provider}'
            raise ImmediateHttpResponse(redirect(redirect_url))

