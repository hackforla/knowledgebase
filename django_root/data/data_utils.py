import json
from core.settings import BASE_DIR
import os
from data.data import data


class DataUtils:
    def update_model_from_json_file(model, json_file):
        json_file = os.path.join(BASE_DIR, json_file)
        with open(json_file, "r") as f:
            json_data = json.load(f)

        for record in json_data:
            model.objects.update_or_create(**record)

    def update_model_from_json(model, json_data):
        for record in json_data:
            model.objects.update_or_create(**record)

    def update_model_from_json_data(model):
        model_name = model.__name__
        data_to_add = data[model_name]
        for record in data_to_add:
            model.objects.update_or_create(**record)
