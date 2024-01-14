import json
from core.settings import BASE_DIR
import os


class DataUtils:
    def update_model_from_json(model, json_file):
        print(f"Updating {model.__name__} from {json_file}")
        json_file = os.path.join(BASE_DIR, json_file)
        with open(json_file, "r") as f:
            json_data = json.load(f)

        for record in json_data:
            model.objects.update_or_create(**record)
