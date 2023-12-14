from django.urls import re_path 
from kb.json_data import get_assetGroup_json, list_assetGroup_json, generate_assetGroup_markdown

urlpatterns = [ 
    re_path(r'^assetGroups/generate$', generate_assetGroup_markdown),
    re_path(r'^assetGroups/list$', list_assetGroup_json),
    re_path(r'^assetGroups/get/(?P<google_id>[A-Z,a-z,0-9,_,-]+)$', get_assetGroup_json)
]

