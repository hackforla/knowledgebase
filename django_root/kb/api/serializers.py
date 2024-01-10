from rest_framework import serializers

# fmt:off
from kb.models import (
    TopicArea,
)

# fmt:on


class TopicAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicArea
        fields = ("id", "name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
