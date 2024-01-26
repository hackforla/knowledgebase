import pytest
from rest_framework.test import APIClient

# fmt: off
from ..models import (
    AssetType,
    TopicArea,
    Phase
)
# fmt: on

asset_type_json = {"name": "Test name asset type"}
topic_area_json = {"name": "Test Topic Area"}

@pytest.mark.django_db
@pytest.fixture
def asset_type():
    return AssetType.objects.create(**asset_type_json)


@pytest.fixture
def topic_area():
    value = TopicArea.objects.create(name="Test Topic Area")
    return value

@pytest.fixture
def phase():
    value = Phase.objects.create(name="Test Phase")
    return value

