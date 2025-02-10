import json
import os
import requests
from urllib3.exceptions import MaxRetryError
from data.people_depot.header import HeaderUtil

PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")

def update_all_from_pd(requesting_user):
    print("people depot url", PEOPLE_DEPOT_URL)
    if not PEOPLE_DEPOT_URL:
        return
    update_groups_from_pd()
    update_practice_areas_from_pd()
    update_users_from_pd(requesting_user)

def update_groups_from_pd():
    people_depot_url = PEOPLE_DEPOT_URL
    if PEOPLE_DEPOT_URL and not PEOPLE_DEPOT_URL.endswith("/"):
        people_depot_url += "/"
    print("updating groups")
    url = people_depot_url + "api/v1/groups"
    print(f"Updating groups from {people_depot_url}")
    response = try_get(url)
    data = response.decode()
    print("debug response", data)
    data = json.loads(data)
    original_count = Group.objects.count()
    for record in data:
        Group.objects.get_or_create(id=record["id"], name=record["name"])
    new_count = Group.objects.count()
    print(f"Added {new_count-original_count} group records")


def update_practice_areas_from_pd():
    people_depot_url = PEOPLE_DEPOT_URL
    if PEOPLE_DEPOT_URL and not PEOPLE_DEPOT_URL.endswith("/"):
        people_depot_url += "/"
    url = people_depot_url + "api/v1/practice-areas"
    print(f"Updating PracticeArea from {people_depot_url}")
    response = try_get(url)
    data = response.decode()
    data = json.loads(data)
    original_count = PracticeArea.objects.count()
    for record in data:
        PracticeArea.objects.get_or_create(uuid=record["uuid"], name=record["name"])
    new_count = PracticeArea.objects.count()
    print(f"Added {new_count-original_count} practice area records")


def update_users_from_pd(requesting_user):
    print("Fetching users from People Depot", PEOPLE_DEPOT_URL)
    headers = HeaderUtil.prepare_headers(requesting_user)
    print("Here")

    # set user_data to json from response
    url = f"{ PEOPLE_DEPOT_URL }/api/v1/users/app/kb"
    response = try_get(url, headers=headers)
    decodedText = response.decode()
    user_data = json.loads(decodedText)

    for user_record in user_data:
        print("Debug user record2", user_record)
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

            result = User.objects.update_or_create(
            defaults=user_record,uuid=user_record["uuid"]
        )

        # set groups
        user = result[0]
        print("debug 1")
        user.groups.set(group_ids)
        print("debug 2")



def try_get(url, headers=None):
    print("Trying to get", url, headers)
    try:
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Error: Received status code {response.status_code} for URL {url}")
            response.raise_for_status()  # Raise an exception for HTTP errors

    except requests.exceptions.ConnectionError or MaxRetryError as e:
        message = str(e).split("\n", 1)[0]
        print(
            f"--- ERROR: Unable to connect to People Depot.  Updates aborted.",
            type(e),
            message,
        )
        raise Exception("Unable to connect to People Depot")
    return response.content



# put imports here to avoid circular imports
from people_depot.models import User, PracticeArea
from django.contrib.auth.models import Group
