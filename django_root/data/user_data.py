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
        headers = HeaderUtil.prepare_headers()
        # Make the signed request
        from urllib3.exceptions import MaxRetryError

        url = f'{ PEOPLE_DEPOT_URL }/api/v1/secure-api/getusers'
        original_stderr = sys.stderr
        try:
            original_tracebacklimit=sys.tracebacklimit
        except AttributeError:
            pass
        sys.tracebacklimit = 0

        try:
            response = requests.get(url, headers=headers)
        except requests.exceptions.ConnectionError or MaxRetryError as e:
            message = str(e).split('\n', 1)[0]
            print(f'--- ERROR: Unable to connect to People Depot.', type(e), message)
            sys.stderr = None
            raise Exception("Unable to connect to People Depot")
        finally:
            sys.stdout = original_stderr


        response = requests.get(url, headers=headers)
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


         
