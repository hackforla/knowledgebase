import json
from kb.models import AssetGroup, AssetGroupAuthor
from django.http import JsonResponse
from django.core import serializers


def get_assetGroup_json(self, google_id):
    # todo: do the below in a single query by including authors in assetGroup object
    assetGroupResultSet = AssetGroup.objects.filter(google_id=google_id)
    if assetGroupResultSet.__len__() == 1:
        assetGroupValues = list(assetGroupResultSet.values())

        assetGroupAuthorValues = list(
            assetGroupResultSet[0]
            .assetGroupauthor_set.all()
            .values("author__name", "author__email")
        )
        data_json = assetGroupValues[0]
        data_json.update({"phase_name": assetGroupResultSet[0].phase.name})
        data_json.update({"authors": assetGroupAuthorValues})
    else:
        data_json = {}
    return JsonResponse(data_json, safe=False)


def list_assetGroup_json(self):
    data = AssetGroup.objects.values()
    data_json = json.dumps(list(data))
    return JsonResponse(data_json, safe=False)


def generate_assetGroup_markdown(self):
    from subprocess import Popen, PIPE

    command = ["ts-node", "knowledgebase/assetGroups2md/scripts/generate-markdown-files.js"]
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
