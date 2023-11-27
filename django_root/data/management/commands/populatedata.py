import json
import os
from django.core.management.base import BaseCommand
from data.program_area_data import ProgramAreaData
from django.contrib.auth.models import User
import requests
import hashlib
import hmac
import time
API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')

def sign_request():
    if not PEOPLE_DEPOT_URL:
        return
    timestamp = str(int(time.time()))
    message = f"{timestamp}{API_KEY}"
    
    signature = hmac.new(API_SECRET.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()
    
    headers = {
        'X-API-Key': API_KEY,
        'X-API-Timestamp': timestamp,
        'X-API-Signature': signature,
    }

    # Make the signed request
    url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/'
    response = requests.get(url, headers=headers)
    for r in json.loads(response.json()['users']):
        uuid = r['pk']
        user_data = r['fields']
        User.objects.update_or_create(
            email=user_data['email'], 
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            username=user_data['username']
        )
                




class Command(BaseCommand):
    help = "Populates data from json files or people depot"

    # def add_arguments(self, parser):
    #     parser.add_argument('poll_ids', nargs='+', type=int)

    def handle(self, *__args__, **__options__):
        ProgramAreaData.update()
        sign_request()     
