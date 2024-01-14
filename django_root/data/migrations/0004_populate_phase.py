from data.people_depot.auth_data import AuthData

from data.people_depot.practice_area_data import PracticeAreaData

from django.db import migrations
from data.data_utils import DataUtils
from kb.models import Phase


def run(__apps__, __schema_editor__):
    print("Loading phases")
    DataUtils.update_model_from_json(Phase, "data/phase_data.json")


class Migration(migrations.Migration):
    dependencies = [("data", "0003_populate_auth")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
