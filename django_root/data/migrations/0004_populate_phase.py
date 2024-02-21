from django.db import migrations
from data.data_utils import DataUtils
from kb.models import Phase


def run(__apps__, __schema_editor__):
    print("Loading phases")
    DataUtils.update_model_from_json_file(Phase, "data/phase_data.json")


class Migration(migrations.Migration):
    dependencies = [("data", "0003_populate_auth")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
