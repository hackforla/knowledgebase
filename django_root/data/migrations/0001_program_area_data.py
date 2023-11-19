import json
import os
from django.db import migrations
import dotenv
import requests
from django_kb_app.models import ProgramArea
from django_kb_app.models2 import other


dotenv.load_dotenv()
PEOPLE_DEPOT_URL=os.environ.get("PEOPLE_DEPOT_URL", default="")
def update(__code__, __reverse_code__):
    # if (PEOPLE_DEPOT_URL):
    #     update_program_area_from_pd()
    # else:
        update_with_specific_values()


def update_with_specific_values():
    status = ProgramArea(uuid=1, name="Citizen Engagement")
    status.save()
    status = ProgramArea(uuid=2, name="Civic Tech Infrastructure")
    status.save()
    status = ProgramArea(uuid=3, name="Diversity / Equity and Inclusion")
    status.save()
    status = ProgramArea(uuid=4, name="Environment")
    status.save()
    status = ProgramArea(uuid=5, name="Justice")
    status.save()
    status = ProgramArea(uuid=6, name="Social Safety Net")
    status.save()
    status = ProgramArea(uuid=7, name="Vote / Representation")
    status.save()
    status = ProgramArea(uuid=8, name="Workforce Development")
    status.save()
    status = ProgramArea(uuid=9, name="Community of Practice")
    status.save()

def update_from_pd():
    people_depot_url = PEOPLE_DEPOT_URL
    if (not PEOPLE_DEPOT_URL.endswith("/")):
        people_depot_url += "/"
    people_depot_url = people_depot_url + "api/v1/program-areas"
    data = requests.get(people_depot_url).content
    data = json.loads(data)
    for record in data:
        ProgramArea.objects.update_or_create(uuid=record["uuid"], name=record["name"])
    print(f'Added {len(data)} program area records')
            

class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ('django_kb_app', '0001_initial')
    ]

    operations = [
        migrations.RunPython( update, migrations.RunPython.noop )
    ]
