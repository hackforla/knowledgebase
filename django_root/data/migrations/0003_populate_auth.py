from data.people_depot.auth_data import AuthData

from django.db import migrations


def run(__apps__, __schema_editor__):
    print("Migration: Loading auth data")
    AuthData.load_all()


class Migration(migrations.Migration):
    dependencies = [("data", "0002_peopledepot_populate_practice_area")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
