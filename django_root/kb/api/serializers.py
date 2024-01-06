from rest_framework import serializers 
from kb.models import (
    AssetType,
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
        

class AssetTypeSerializer(serializers.ModelSerializer):

    class Meta: 
        model = AssetType
        fields = (
            "id",
            "created_at",
            "updated_at",
            "name",
        )

        read_only_fields = (
            "id",
            "updated_at",
            "created_at",
        )
