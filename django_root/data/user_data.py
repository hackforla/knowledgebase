from contextlib import redirect_stdout
import json
import os
import sys
import requests
import json
import os
import requests
from data.data_utils import DataUtil

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
        response = DataUtil.try_get(url, headers)

        for r in json.loads(response.json()['groups']):
            id = r['pk']
            Group.objects.update_or_create(
                id = id,
                name = r['fields']['name'],
            )

        for r in json.loads(response.json()['users']):
            uuid = r['pk']
            user_data = r['fields']
            group_ids = user_data['groups']

            result = User.objects.update_or_create(
                uuid=uuid,
                email=user_data['email'], 
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                username=user_data['username'],
            )
            user = result[0]
            current_ids = [user.id for user in user.groups.all()]
            for id in group_ids:
                if not id in current_ids:
                    user.groups.add(id)
            for id in current_ids:
                if not id in group_ids:
                    user.groups.remove(id)
                        
# put imports here to avoid circular imports
from pd_data.models import User
from django.contrib.auth.models import Group
from data.header import HeaderUtil


         
