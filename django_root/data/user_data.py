import json
import os
import requests
import json
import os
import requests

PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')

class UserData:

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
 
    def update_users_from_pd():
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
        
# put imports here to avoid circular imports
from django_kb_app.models import User
from data.data_utils import DataUtil


         
