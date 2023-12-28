import os
import hashlib
import hmac
import time
from django.core.management import call_command
import os
import sys
import requests

from data.auth_data import AuthData

PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')
from urllib3.exceptions import MaxRetryError


class DataUtil:
    

    @staticmethod
    def try_get(url, headers=None):
        original_stderr = sys.stderr
        data = None
        try:
            data = requests.get(url, headers=headers).content
        except requests.exceptions.ConnectionError or MaxRetryError as e:
            message = str(e).split('\n', 1)[0]
            print(f'--- ERROR: Unable to connect to People Depot.  Updates aborted.', type(e), message)
            sys.stderr = None
            raise Exception("Unable to connect to People Depot")
        finally:
            sys.stdout = original_stderr
        return data
    
    @staticmethod
    def update_all_data():
        print("Updating practice areas")
        # PracticeAreaData.update_from_source()
        print("Updating users")
        UserData.update_users_from_pd()
        print("Loading auth data")
        AuthData.load_all()
        
# put imports here to avoid circular imports
from data.practice_area_data import PracticeAreaData
from data.user_data import UserData
                
