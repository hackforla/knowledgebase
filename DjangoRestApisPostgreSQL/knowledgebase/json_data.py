import json
from knowledgebase.models import Gdoc, GdocAuthor
from django.http import JsonResponse
from django.core import serializers


def get_gdoc_json(self, google_id):
    # todo: do the below in a single query by including authors in gdoc object
    gdocResultSet = Gdoc.objects.filter(google_id=google_id)
    if gdocResultSet.__len__() == 1:
        gdocValues = list(gdocResultSet.values())

        print("debug: gdocValues: ", json.dumps(gdocValues, indent=4))
        gdocAuthorValues = list(
            gdocResultSet[0]
            .gdocauthor_set.all()
            .values("author__name", "author__email")
        )
        data_json = gdocValues[0]
        data_json.update({"phase_name": gdocResultSet[0].phase.name})
        data_json.update({"authors": gdocAuthorValues})
    else:
        data_json = {}
    return JsonResponse(data_json, safe=False)


def list_gdoc_json(self):
    data = Gdoc.objects.values()
    data_json = json.dumps(list(data))
    return JsonResponse(data_json, safe=False)


def generate_gdoc_markdown(self):
    from subprocess import Popen, PIPE

    command = ["ts-node", "knowledgebase/gdocs2md/scripts/generate-markdown-files.js"]
    result = {}
    try:
        process = Popen(command, stdout=PIPE, stderr=PIPE)
        output = process.stdout.read()
        err = process.stderr.read()
        exitstatus = process.poll()
        if exitstatus == 0:
            result = {"status": "Success", "output": str(output), "error": str(err)}
        else:
            result = {"status": "Failed", "output": str(output), "error": str(err)}

    except Exception as e:
        result = {"status": "failed", "output": str(e)}
    return JsonResponse(result, safe=False)
