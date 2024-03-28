import pytest
from rest_framework.test import APIClient

# fmt: off
from ..models import (
    Usability,
    AssetType,
    AssetCategory,
    TopicArea,
    Phase
)
# fmt: on

usability_json = { "name": "Test name usability" }
asset_category_json = {"name": "Test name asset category"}
asset_type_json = {"asset_category_id": 1, "name": "Test name asset type"}
topic_area_json = {"name": "Test Topic Area"}


@pytest.mark.django_db
@pytest.fixture
def usability():
    return Usability.objects.create(**usability_json)


@pytest.fixture
def asset_type():
    return AssetType.objects.create(**asset_type_json)


@pytest.fixture
def asset_category():
    return AssetCategory.objects.create(**asset_category_json)


@pytest.fixture
def topic_area():
    value = TopicArea.objects.create(name="Test Topic Area")
    return value


@pytest.fixture
def phase():
    value = Phase.objects.create(name="Test Phase")
    return value
