from data.people_depot.user_data import UserData

from django.db import migrations


def run(__apps__, __schema_editor__):
    UserData.update_users_from_pd()


class Migration(migrations.Migration):
    initial = True
    dependencies = [("kb", "0001_initial")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
