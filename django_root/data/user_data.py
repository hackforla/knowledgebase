from contextlib import redirect_stdout
import json
import os
import sys
import requests
import json
import os
import requests

PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')

class UserData:

    def create_peopledepot_user(uuid, username, email, first_name=None, last_name=None):
        headers = HeaderUtil.prepare_headers()
        # Make the signed request
        url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/createuser'
        data = {
            'uuid': uuid,
            'username': username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name
        }
        
        requests.post(url, data=data, headers=headers)
 
    def update_users_from_pd():
        if not PEOPLE_DEPOT_URL:
            return
        headers = HeaderUtil.prepare_headers()
        # Make the signed request
        from urllib3.exceptions import MaxRetryError

        url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/getusers'
        response = DataUtil.try_get(url, headers=headers)
        decodedText = response.decode()
        response_json = json.loads(decodedText)
        print("json", response_json)
        user_data = json.loads(response_json['users'])
        print("user_data", user_data)

        for r in user_data:
            print("record", r)
            uuid = r['pk']
            # user_json = r['fields']
            data = r['fields']
            group_ids = data['groups']

            result = User.objects.update_or_create(
                uuid=uuid,
                email=data['email'], 
                first_name=data['first_name'],
                last_name=data['last_name'],
                username=data['username'],
            )
            user = result[0]
            user.groups.set(group_ids)

                        
# put imports here to avoid circular imports
from pd_data.models import User
from django.contrib.auth.models import Group
from data.header import HeaderUtil
from data.data_utils import DataUtil

         
