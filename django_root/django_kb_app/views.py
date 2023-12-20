from rest_framework import viewsets
from .models import TopicArea
from .serializers import TopicAreaSerializer
from drf_spectacular.utils import extend_schema, extend_schema_view

@extend_schema_view(
    list=extend_schema(description="Return a list of all the topic areas"),
    retrieve=extend_schema(description="Retrieve a topic area"),
)
class TopicAreaViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = TopicArea.objects.all()
    serializer_class = TopicAreaSerializer

