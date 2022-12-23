import json
from knowledgebase.models import Gdoc
from django.http import JsonResponse
from django.core import serializers

def get_gdoc_json(self, google_id):
    print("get_gdoc_json: google_id = " + google_id)
    data = Gdoc.objects.filter(google_id=google_id).values()
    data_json = json.dumps(list(data)[0])
    return JsonResponse(data_json, safe=False)

def list_gdoc_json(self):
    data = Gdoc.objects.values()
    data_json = json.dumps(list(data))
    return JsonResponse(data_json, safe=False)
