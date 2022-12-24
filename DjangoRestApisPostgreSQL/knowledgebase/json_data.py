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

def generate_gdoc_markdown(self):
    from subprocess import Popen, PIPE
    command = ["node","./gdocs2md/scripts/generate-markdown-files.js"]
    result = {}
    try:
        process = Popen(command, stdout=PIPE, stderr=PIPE)
        output = process.stdout.read()
        err = process.stderr.read()
        exitstatus = process.poll()
        if (exitstatus==0):
            result = {"status": "Success", "output":str(output), "error":str(err)}
        else:
            result = {"status": "Failed", "output":str(output), "error":str(err)}

    except Exception as e:
        result =  {"status": "failed", "output":str(e)}
    return JsonResponse(result, safe=False)
    

