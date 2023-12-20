from django.urls import re_path 
from rest_framework import routers
from .views import TopicAreaViewSet 
from django_kb_app.json_data import get_gdoc_json, list_gdoc_json, generate_gdoc_markdown

router = routers.SimpleRouter()
router.register(r"topic-areas", TopicAreaViewSet, basename="topic-area")

urlpatterns = [ 
    re_path(r'^gdocs/generate$', generate_gdoc_markdown),
    re_path(r'^gdocs/list$', list_gdoc_json),
    re_path(r'^gdocs/get/(?P<google_id>[A-Z,a-z,0-9,_,-]+)$', get_gdoc_json),
]

urlpatterns += router.urls

