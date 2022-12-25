from django.urls import re_path 
from knowledgebase.json_data import get_gdoc_json, list_gdoc_json, generate_gdoc_markdown

urlpatterns = [ 
    re_path(r'^gdocs/generate$', generate_gdoc_markdown),
    re_path(r'^gdocs/list$', list_gdoc_json),
    re_path(r'^gdocs/get/(?P<google_id>[A-Z,a-z,0-9,_,-]+)$', get_gdoc_json)
]

