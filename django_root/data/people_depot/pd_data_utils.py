import os
import os
import sys
import requests

from data.people_depot.auth_data import AuthData

PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")


PEOPLE_DEPOT_API_KEY = os.environ.get("PEOPLE_DEPOT_API_KEY")
PEOPLE_DEPOT_API_SECRET = os.environ.get("PEOPLE_DEPOT_API_SECRET")
PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL")
from urllib3.exceptions import MaxRetryError


class PdDataUtil:
    @staticmethod
    def try_get(url, headers=None):
        print("Trying to get", PEOPLE_DEPOT_URL)
        if not PEOPLE_DEPOT_URL:
            print("PEOPLE_DEPOT_URL not set.  Updating using local values.")
            return
        if PEOPLE_DEPOT_URL and not PEOPLE_DEPOT_API_KEY:
            raise Exception(
                "PEOPLE_DEPOT_API_KEY not set.  Updating using local values."
            )
        original_stderr = sys.stderr
        data = None
        try:
            data = requests.get(url, headers=headers).content
        except requests.exceptions.ConnectionError or MaxRetryError as e:
            message = str(e).split("\n", 1)[0]
            print(
                f"--- ERROR: Unable to connect to People Depot.  Updates aborted.",
                type(e),
                message,
            )
            sys.stderr = None
            raise Exception("Unable to connect to People Depot")
        finally:
            sys.stdout = original_stderr
        return data

    @staticmethod
    def update_all_data():
        print("Updating practice areas")
        PracticeAreaData.update_from_source()
        print("Updating users")
        UserData.update_users_from_pd()
        print("Loading auth data")
        AuthData.load_all()


# put imports here to avoid circular imports
from data.people_depot.practice_area_data import PracticeAreaData
from data.people_depot.user_data import UserData
