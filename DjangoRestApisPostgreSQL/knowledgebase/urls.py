from django.urls import re_path 
from knowledgebase import views 
from knowledgebase.json_data import get_gdoc_json, list_gdoc_json, generate_gdoc_markdown

urlpatterns = [ 
    re_path(r'^api/gdoc2s$', views.gdoc_list),
    re_path(r'^api/gdocs/(?P<pk>[0-9]+)$', views.gdoc_detail),
    re_path(r'^api/gdocs/generate$', generate_gdoc_markdown),
    re_path(r'^api/gdocs/published$', views.list_gdoc_published),
    re_path(r'^gdocs/list$', list_gdoc_json),
    re_path(r'^gdocs/get/(?P<google_id>[A-Z,a-z,0-9,_]+)$', get_gdoc_json)
]

