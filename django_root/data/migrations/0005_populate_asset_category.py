from django.db import migrations
from data.data_utils import DataUtils
from kb.models import AssetCategory


def run(__apps__, __schema_editor__):
    print("Loading phases")
    DataUtils.update_model_from_json(AssetCategory, "data/asset_category_data.json")


class Migration(migrations.Migration):
    dependencies = [("data", "0004_populate_phase"), ("kb", "0008_assetcategory")]
    operations = [migrations.RunPython(run, migrations.RunPython.noop)]
