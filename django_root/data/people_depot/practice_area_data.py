import json
import os
from core.settings import BASE_DIR

PEOPLE_DEPOT_URL = os.environ.get("PEOPLE_DEPOT_URL", default="")


class PracticeAreaData:
    def update_from_source():
        if PEOPLE_DEPOT_URL:
            print("Updating PracticeArea from People Depot")
            PracticeAreaData.update_from_pd()
        else:
            print("Updating PracticeArea from script")
            PracticeAreaData.update_from_json_file()

    def update_from_json_file():
        from people_depot.models import PracticeArea

        file_spec = os.path.join(
            BASE_DIR, "data/people_depot/practice_area_export.json"
        )
        print("Updating PracticeArea from practice_area_export.json")
        f = open(file_spec, "r")
        data = json.load(f)
        for record in data:
            PracticeArea.objects.get_or_create(name=record["fields"]["name"])

    def update_from_pd():
        people_depot_url = PEOPLE_DEPOT_URL
        if PEOPLE_DEPOT_URL and not PEOPLE_DEPOT_URL.endswith("/"):
            people_depot_url += "/"
        url = people_depot_url + "api/v1/practice-areas"
        print(f"Updating PracticeArea from {people_depot_url}")
        response = PdDataUtil.try_get(url)
        data = response.decode()
        data = json.loads(data)
        original_count = PracticeArea.objects.count()
        for record in data:
            PracticeArea.objects.get_or_create(name=record["name"])
        new_count = PracticeArea.objects.count()
        print(f"Added {new_count-original_count} practice area records")


from people_depot.models import PracticeArea
from data.people_depot.pd_data_utils import PdDataUtil
