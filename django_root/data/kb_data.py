import json
import os
import dotenv
import requests
from django_kb_app.models import ProgramArea

dotenv.load_dotenv()
PEOPLE_DEPOT_URL=os.environ.get('PEOPLE_DEPOT_URL', default="")



def update_program_from_pd():
    url = PEOPLE_DEPOT_URL
    if (not url.endswith("/")):
        url += "/"
    url = url + "api/v1/program-areas"
    data = requests.get(url).content
    data = json.loads(data)
    for record in data:
        ProgramArea.objects.update_or_create(uuid=record['uuid'], name=record['name'])
    print(f'Added {len(data)} program area records')
            

