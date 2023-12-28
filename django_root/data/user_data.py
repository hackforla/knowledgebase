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
        print(f'content: {decodedText}')
        user_json = json.loads(decodedText)
        print(f'user_json: {user_json}')
        # user_json = decodedText
        # print(f'user_json: {user_json}')
        # group_data = json.loads(json_data['groups'])
        # print('group_data: ', group_data)
        

        # for r in group_data:
            # id = r['pk']
            # Group.objects.update_or_create(
            #     id = id,
            #     name = r['fields']['name'],
            # )

        for r in user_json:
            print(f'r: {r}')
            uuid = r['uuid']
            # user_json = r['fields']
            group_ids = r['groups']

            result = User.objects.update_or_create(
                uuid=uuid,
                email=r['email'], 
                first_name=r['first_name'],
                last_name=r['last_name'],
                username=r['username'],
            )
            user = result[0]
            current_ids = [user.id for user in user.groups.all()]
            for r in group_ids:
                id = r['id']
                if not id in current_ids:
                    user.groups.add(id)
            for id in current_ids:
                if not id in group_ids:
                    user.groups.remove(id)
                        
# put imports here to avoid circular imports
from pd_data.models import User
from django.contrib.auth.models import Group
from data.header import HeaderUtil
from data.data_utils import DataUtil

         
