from contextlib import redirect_stdout
import json
import os
import sys
import requests
import json
import os
import requests

PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")


PEOPLE_DEPOT_API_KEY = os.environ.get("PEOPLE_DEPOT_API_KEY")
PEOPLE_DEPOT_API_SECRET = os.environ.get("PEOPLE_DEPOT_API_SECRET")
PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL")


class UserData:
    def create_peopledepot_user(uuid, username, email, first_name=None, last_name=None):
        headers = HeaderUtil.prepare_headers()
        # Make the signed request
        url = f"{ PEOPLE_DEPOT_URL }/api/v1/secure-api/createuser"
        data = {
            "uuid": uuid,
            "username": username,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
        }

        requests.post(url, data=data, headers=headers)

    def update_users_from_pd():
        if not PEOPLE_DEPOT_URL:
            print("Skipping fetch users from People Depot", PEOPLE_DEPOT_URL)
            return
        print("Fetching users from People Depot", PEOPLE_DEPOT_URL)
        headers = HeaderUtil.prepare_headers()

        # set user_data to json from response
        url = f"{ PEOPLE_DEPOT_URL }/api/v1/secure-api/getusers"
        response = PdDataUtil.try_get(url, headers=headers)
        decodedText = response.decode()
        user_data = json.loads(decodedText)

        for user_record in user_data:
            group_ids = user_record["groups"]

            # remove keys not in User model and remove groups
            keys_to_remove_from_user_record = [
                key for key in user_record.keys() if key not in User.__dict__
            ]
            for key in keys_to_remove_from_user_record:
                user_record.pop(key)

            if user_record["groups"] is not None:
                print("pop groups")
                user_record.pop("groups")

            if user_record["user_permissions"] is not None:
                user_record.pop("user_permissions")

            result = User.objects.update_or_create(
                defaults=user_record, uuid=user_record["uuid"]
            )

            # set groups
            user = result[0]
            print("debug 1")
            user.groups.set(group_ids)
            print("debug 2")


# put imports here to avoid circular imports
from people_depot.models import User
from django.contrib.auth.models import Group
from data.people_depot.header import HeaderUtil
from data.people_depot.pd_data_utils import PdDataUtil
