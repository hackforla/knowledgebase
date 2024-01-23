from rest_framework import viewsets


# fmt: off
from kb.models import (
    AssetType,
    Phase,
    TopicArea
)

from .serializers import (
    AssetTypeSerializer,
    TopicAreaSerializer,
    PhaseSerializer
)
# fmt: on

from drf_spectacular.utils import extend_schema, extend_schema_view


@extend_schema_view(
    list=extend_schema(description="Return a list of all the topic areas"),
    retrieve=extend_schema(description="Retrieve a topic area"),
)
class TopicAreaViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = TopicArea.objects.all()
    serializer_class = TopicAreaSerializer


@extend_schema_view(
    list=extend_schema(description="Return a list of all the asset types"),
    retrieve=extend_schema(description="Retrieve an asset type"),
)
class AssetTypeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer


@extend_schema_view(
    list=extend_schema(description="Return a list of all asset phase"),
    retrieve=extend_schema(description="Retrieve an asset phase"),
)
class PhaseViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer
