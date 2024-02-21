from django.db import migrations
from data.data_utils import DataUtils
from kb.models import AssetType


def run(__apps__, __schema_editor__):
    print("Loading asset types")
    DataUtils.update_model_from_json_data(AssetType)


class Migration(migrations.Migration):
    dependencies = [
        ("data", "0005_populate_asset_category"),
        ("kb", "0010_alter_assetgroup_options_alter_asset_unique_together_and_more"),
    ]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
