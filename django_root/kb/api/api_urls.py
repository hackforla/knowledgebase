from django.urls import path
from rest_framework import routers

# fmt: off
from kb.api.api_views import (
    AssetTypeViewSet,
    TopicAreaViewSet,
    PhaseViewSet,
    AssetCategoryViewSet,
    UsabilityViewSet,
)
# fmt: on
#
# from kb.json_data import (
#     get_assetGroup_json,
#     list_assetGroup_json,
#     generate_assetGroup_markdown,
# )
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.views import SpectacularRedocView
from drf_spectacular.views import SpectacularSwaggerView

router = routers.SimpleRouter()
router.register(r"api/v1/asset-types", AssetTypeViewSet, basename="asset-type")
router.register(r"api/v1/topic-areas", TopicAreaViewSet, basename="topic-area")
router.register(r"api/v1/phase", PhaseViewSet, basename="phase")
router.register(
    r"api/v1/asset-category", AssetCategoryViewSet, basename="asset-category"
)
router.register(r"api/v1/usabilities", UsabilityViewSet, basename="usability")

urlpatterns = [
    #     re_path(r'^gdocs/generate$', generate_assetGroup_markdown),
    #     re_path(r'^gdocs/list$', list_assetGroup_json),
    #     re_path(r'^gdocs/get/(?P<google_id>[A-Z,a-z,0-9,_,-]+)$', get_assetGroup_json),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

urlpatterns += router.urls
