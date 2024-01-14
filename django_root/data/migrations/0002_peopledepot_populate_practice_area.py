from data.people_depot.practice_area_data import PracticeAreaData

from django.db import migrations


def run(__apps__, __schema_editor__):
    print("Migration: Updating practice areas")
    PracticeAreaData.update_from_source()


class Migration(migrations.Migration):
    dependencies = [("data", "0001_peopledepot_populate_user")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
