# custom_adapter.py
from django.shortcuts import redirect
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.models import SocialLogin

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    
    def post_social_login(self, request, sociallogin: SocialLogin ):
        pass
        if (request.user.groups):
            provider = sociallogin.account.provider  
            redirect_url = f'../../../../kb/socialsignup/?provider={provider}'
            raise ImmediateHttpResponse(redirect(redirect_url))

