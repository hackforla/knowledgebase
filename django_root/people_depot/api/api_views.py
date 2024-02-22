from rest_framework import viewsets


# fmt: off
from people_depot.models import (
    Organization
)

from .serializers import (
    OrganizationSerializer
)
# fmt: on

from drf_spectacular.utils import extend_schema, extend_schema_view


@extend_schema_view(
    list=extend_schema(description="Return a list of all the organizations"),
    retrieve=extend_schema(description="Retrieve all the organization details"),
)
class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = []
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
