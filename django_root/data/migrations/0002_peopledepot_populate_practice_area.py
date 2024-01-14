from data.people_depot.practice_area_data import PracticeAreaData

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("people_depot", "0001_peopledepot_populate_user")]
    operations = [PracticeAreaData.update_practice_areas_from_pd()]
