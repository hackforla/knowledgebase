import json
from kb.models import AssetGroup, AssetUsers
from django.http import JsonResponse
from django.core import serializers


def get_asset_json(self, google_id):
    # todo: do the below in a single query by including users in assetGroup object
    assetResultSet = Asset.objects.filter(google_id=google_id)
    if assetResultSet.__len__() == 1:
        assetValues = list(assetResultSet.values())

        assetUserValues = list(
            assetResultSet[0].assetuser_set.all().values("user__name", "user__email")
        )
        data_json = assetValues[0]
        data_json.update({"phase_name": assetResultSet[0].phase.name})
        data_json.update({"users": assetUserValues})
    else:
        data_json = {}
    return JsonResponse(data_json, safe=False)


def list_assetGroup_json(self):
    data = AssetGroup.objects.values()
    data_json = json.dumps(list(data))
    return JsonResponse(data_json, safe=False)


def generate_assetGroup_markdown(self):
    from subprocess import Popen, PIPE

    command = [
        "ts-node",
        "knowledgebase/assetGroups2md/scripts/generate-markdown-files.js",
    ]
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
