import json
import os
import dotenv
import requests
from urllib3.exceptions import MaxRetryError

dotenv.load_dotenv()
PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")
import sys


class PracticeAreaData:
    def update_from_source():
        if PEOPLE_DEPOT_URL:
            PracticeAreaData.update_from_pd()
        else:
            PracticeAreaData.update_from_json_file()

    def update_from_json_file():
        from pd_data.models import PracticeArea

        print("Updating PracticeArea from practice_area_export.json")
        f = open("data/practice_area_export.json")
        data = json.load(f)
        for record in data:
            PracticeArea.objects.get_or_create(name=record["fields"]["name"])

    def update_from_pd():
        people_depot_url = PEOPLE_DEPOT_URL
        if not PEOPLE_DEPOT_URL:
            return
        if not PEOPLE_DEPOT_URL.endswith("/"):
            people_depot_url += "/"
        url = people_depot_url + "api/v1/practice-areas"
        print(f"Updating PracticeArea from {people_depot_url}")
        response = DataUtil.try_get(url)
        data = response.decode()
        data = json.loads(data)
        original_count = PracticeArea.objects.count()
        for record in data:
            PracticeArea.objects.get_or_create(name=record["name"])
        new_count = PracticeArea.objects.count()
        print(f"Added {new_count-original_count} practice area records")


from pd_data.models import PracticeArea
from data.data_utils import DataUtil
