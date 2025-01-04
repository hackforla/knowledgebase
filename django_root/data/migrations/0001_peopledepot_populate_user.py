from django.db import migrations


def run(__apps__, __schema_editor__):
    pass
    # update_users_from_pd is called

class Migration(migrations.Migration):
    initial = True
    dependencies = [("kb", "0001_initial")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
