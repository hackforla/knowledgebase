from django.db import migrations
from people_depot.sync import update_users_from_pd


def run(__apps__, __schema_editor__):
    pass
    # update_users_from_pd()

class Migration(migrations.Migration):
    initial = True
    dependencies = [("kb", "0001_initial")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
