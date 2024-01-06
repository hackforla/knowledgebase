from rest_framework import serializers 
from kb.models import (
    TopicArea,
)

class TopicAreaSerializer(serializers.ModelSerializer):

    class Meta: 
        model = TopicArea
        fields = (
            "id",
            "created_at",
            "updated_at", 
            "name",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at,"
        )
        
