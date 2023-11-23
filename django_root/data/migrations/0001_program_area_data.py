import json
import os
from django.db import migrations
import dotenv
import requests
from django_kb_app.models import ProgramArea


dotenv.load_dotenv()
PEOPLE_DEPOT_URL=os.environ.get("PEOPLE_DEPOT_URL", default="")


def update(__code__, __reverse_code__):
    if (PEOPLE_DEPOT_URL):
        update_from_pd()
    else:
        update_with_specific_values()


def update_with_specific_values():
  f = open('ProgramArea_export.json')
  data = json.load(f)
  for record in data:
    ProgramArea.objects.update_or_create(**record)

def update_from_pd():
    people_depot_url = PEOPLE_DEPOT_URL
    if (not PEOPLE_DEPOT_URL.endswith("/")):
        people_depot_url += "/"
    people_depot_url = people_depot_url + "api/v1/program-areas"
    data = requests.get(people_depot_url).content
    data = json.loads(data)
    for record in data:
        rec = ProgramArea.objects.update_or_create(**record)
    print(f'Added {len(data)} program area records')
            

class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ('django_kb_app', '0002_programarea_description_programarea_image')
    ]

    operations = [
        migrations.RunPython( update, migrations.RunPython.noop )
    ]
