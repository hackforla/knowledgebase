import json
import os
import dotenv
import requests
from django_kb_app.models import ProgramArea


dotenv.load_dotenv()
PEOPLE_DEPOT_URL=os.environ.get("PEOPLE_DEPOT_URL", default="")


class ProgramAreaData:
    def update():
        if (PEOPLE_DEPOT_URL):
            ProgramAreaData.update_from_pd()
        else:
            ProgramAreaData.update_from_json_file()


    def update_from_json_file():
        print("")
        print("Updating ProgramArea from ProgramArea_export.json")
        f = open('data/migrations/ProgramArea_export.json')
        data = json.load(f)
        print("Debug json", data)
        for record in data:
            ProgramArea.objects.update_or_create(**record)
        print("Done")

    def update_from_pd():
        people_depot_url = PEOPLE_DEPOT_URL
        if (not PEOPLE_DEPOT_URL):
            return
        if (not PEOPLE_DEPOT_URL.endswith("/")):
            people_depot_url += "/"
        people_depot_url = people_depot_url + "api/v1/program-areas"
        data = requests.get(people_depot_url).content
        data = json.loads(data)
        for record in data:
            print("adding or updating", record["id"], record["name"])
            ProgramArea.objects.update_or_create(**record)
        print(f'Added {len(data)} program area records')
