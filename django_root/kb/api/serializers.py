from rest_framework import serializers

# fmt: off
from kb.models import (
    AssetCategory,
    AssetType,
    Phase,
    TopicArea,
    AssetCategory
)

# fmt: on


class TopicAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicArea
        fields = ("id", "name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")


class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = ("id", "created_at", "updated_at", "name")
        read_only_fields = ("id", "updated_at", "created_at")


class AssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetType
        fields = ("id", "created_at", "updated_at", "name")
        read_only_fields = ("id", "updated_at", "created_at")


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ("id", "name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")


class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = ("id", "name", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
