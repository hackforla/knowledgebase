from django.urls import re_path 
from rest_framework import routers
from kb.api.views import TopicAreaViewSet 
from kb.json_data import get_assetGroup_json, list_assetGroup_json, generate_assetGroup_markdown

router = routers.SimpleRouter()
router.register(r"topic-areas", TopicAreaViewSet, basename="topic-area")

urlpatterns = [ 
    re_path(r'^gdocs/generate$', generate_assetGroup_markdown),
    re_path(r'^gdocs/list$', list_assetGroup_json),
    re_path(r'^gdocs/get/(?P<google_id>[A-Z,a-z,0-9,_,-]+)$', get_assetGroup_json),
]

urlpatterns += router.urls

