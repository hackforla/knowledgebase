from rest_framework import viewsets
from kb.models import (
    AssetType,
    TopicArea,
)
from .serializers import (
    AssetTypeSerializer,
    TopicAreaSerializer,
)

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
    retrieve=extend_schema(description="Retrieve a asset type"),
)
class AssetTypeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer
