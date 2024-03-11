import pytest
from rest_framework.test import APIClient

# fmt: off
from ..models import (
    AssetType,
    AssetCategory,
    TopicArea,
    Phase
)
# fmt: on

asset_category_json = {"id": 1000, "name": "Test name asset category"}
asset_type_json = {"id": 1000, "name": "Test name asset type"}
topic_area_json = {"id": 1000, "name": "Test Topic Area"}
phase_json = {"id": 1000, "name": "Test Phase Name"}


# @pytest.mark.django_db
# @pytest.fixture
# def asset_type():
#     return AssetType.objects.create(**asset_type_json)


@pytest.mark.django_db
@pytest.fixture
def asset_category():
    return AssetCategory.objects.create(**asset_category_json)


@pytest.mark.django_db
@pytest.fixture
def topic_area():
    value = TopicArea.objects.create(**topic_area_json)
    return value


@pytest.mark.django_db
@pytest.fixture
def phase():
    value = Phase.objects.create(**phase_json)
    return value
