from rest_framework import serializers

# fmt: off
from people_depot.models import (
    Organization
)

# fmt: on


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ("id", "name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
