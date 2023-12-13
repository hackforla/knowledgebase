import json
import os
import requests
import hashlib
import hmac
import time
from django.core.management.base import BaseCommand
import json
import os
import dotenv
import requests

PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')
from data.program_area_data import ProgramAreaData


class DataUtil:

    def prepare_headers():
        if not PEOPLE_DEPOT_URL:
            return
        timestamp = str(int(time.time()))
        message = f"{timestamp}{PEOPLE_DEPOT_API_KEY}"
        
        signature = hmac.new(PEOPLE_DEPOT_API_SECRET.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()
        print("key", PEOPLE_DEPOT_API_KEY)
        return {
            'X-API-Key': PEOPLE_DEPOT_API_KEY,
            'X-API-Timestamp': timestamp,
            'X-API-Signature': signature,
        }


    def create_peopledepot_user(username=None, email=None, first_name=None, last_name=None):
        headers = DataUtil.prepare_headers()
        # Make the signed request
        url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/createuser'
        data = {
            'username': username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name
        }
        
        requests.post(url, data=data, headers=headers)
 
    def update_users():
        print("r debug 1")
        headers = DataUtil.prepare_headers()
        # Make the signed request
        url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/getusers'
        response = requests.get(url, headers=headers)
        for r in json.loads(response.json()['users']):
            print("r debug 2")
            uuid = r['pk']
            user_data = r['fields']

            User.objects.update_or_create(
                uuid=uuid,
                email=user_data['email'], 
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                username=user_data['username']
            )
                    
    @staticmethod
    def update_all_data():
        print("Updating all data")
        # ProgramAreaData.update()
        print("Updating users")
        DataUtil.update_users()
        
from django_kb_app.models import User
                

         
