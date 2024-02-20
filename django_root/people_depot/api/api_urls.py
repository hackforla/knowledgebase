from django.urls import path
from rest_framework import routers

# fmt: off
from people_depot.api.api_views import (
    OrganizationViewSet,
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
router.register(r"api/v1/organizations", OrganizationViewSet, basename="organization")
urlpatterns = [
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
