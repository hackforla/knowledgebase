import json
import os
import dotenv
import requests

dotenv.load_dotenv()
PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default='')


class ProgramAreaData:

    def update_from_source():
        pass
        # if (PEOPLE_DEPOT_URL):
        #     ProgramAreaData.update_from_pd()
        # else:
        #     ProgramAreaData.update_from_json_file()
    


    def update_from_json_file():
        from pd_data.models import PracticeArea
        print('Updating PracticeArea from program_area_export.json')
        f = open('data/program_area_export.json')
        data = json.load(f)
        for record in data:
            PracticeArea.objects.update_or_create(**record)


    def update_from_pd():
        people_depot_url = PEOPLE_DEPOT_URL
        if (not PEOPLE_DEPOT_URL):
            return
        if (not PEOPLE_DEPOT_URL.endswith('/')):
            people_depot_url += '/'
        people_depot_url = people_depot_url + 'api/v1/practice-areas'
        print(f'Updating PracticeArea from {people_depot_url}')
        data = requests.get(people_depot_url).content
        print(f'content: {data}')
        data = json.loads(data)
        print(f'data: {data}')
        for record in data:
            print(f'record: {record}')
            PracticeArea.objects.update_or_create(**record)
        print(f'Added {len(data)} program area records')

from kb.models import PracticeArea
