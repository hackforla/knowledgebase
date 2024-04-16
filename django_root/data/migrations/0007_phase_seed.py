from django.db import migrations
from data.data_utils import DataUtils
from kb.models import Tool


def run(__apps__, __schema_editor__):
    print("Loading tools")
    DataUtils.update_model_from_json_file(Tool, "data/tools_data.json")


class Migration(migrations.Migration):
    dependencies = [("data", "0004_populate_phase")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]