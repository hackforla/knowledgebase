from data.people_depot.auth_data import AuthData

from data.people_depot.practice_area_data import PracticeAreaData

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("people_depot", "0002_peopledepot_practice_area")]
    operations = [AuthData.load_all()]
