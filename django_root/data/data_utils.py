import os
import hashlib
import hmac
import time
from django.core.management import call_command
import os

from data.auth_data import AuthData

PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")


PEOPLE_DEPOT_API_KEY = os.environ.get('PEOPLE_DEPOT_API_KEY')
PEOPLE_DEPOT_API_SECRET = os.environ.get('PEOPLE_DEPOT_API_SECRET')
PEOPLE_DEPOT_URL = os.environ.get('PEOPLE_DEPOT_URL')


class DataUtil:

    @staticmethod
    def update_all_data():
        print("Updating all data")
        ProgramAreaData.update_from_source()
        print("Updating users")
        UserData.update_users_from_pd()
        print("Loading auth data")
        AuthData.load_all()
        
# put imports here to avoid circular imports
from data.program_area_data import ProgramAreaData
from data.user_data import UserData
                

         
