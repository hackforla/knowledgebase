from django.urls import re_path 
from knowledgebase import views 
from knowledgebase.json_data import get_gdoc_info_json, list_gdoc_info_json

urlpatterns = [ 
    re_path(r'^api/tutorials$', views.tutorial_list),
    re_path(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    re_path(r'^api/tutorials/published$', views.tutorial_list_published),
    re_path(r'^gdocinfo/list', list_gdoc_info_json),
    re_path(r'^gdocinfo/get/(?P<google_id>[A-Z,a-z,0-9,_]+)$', get_gdoc_info_json)
]

