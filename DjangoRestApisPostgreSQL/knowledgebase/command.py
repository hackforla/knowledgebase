from subprocess import Popen, PIPE
from django.http import JsonResponse

command = ["node","./gdocs2md/scripts/generate-markdown-files.js"]
result = {}
try:
        process = Popen(command, stdout=PIPE, stderr=PIPE)
        print("ok")
        output = process.stdout.read()
        err = process.stderr.read()
        exitstatus = process.poll()
        if (exitstatus==0):
                result = {"status": "Success", "output":str(output), "error":str(err)}
        else:
                result = {"status": "Failed", "output":str(output), "error":str(err)}

except Exception as e:
        result =  {"status": "failed", "output":str(e)}
print(result)
