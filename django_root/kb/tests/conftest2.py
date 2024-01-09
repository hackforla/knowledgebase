import pytest

# fmt: off
from ..models import (
    AssetType, 
    TopicArea
)
# fmt: on

asset_type_json = {"name": "Test name asset type"}
topic_area_json = {"name": "Test Topic Area"}


@pytest.fixture
def asset_type():
    return AssetType.objects.create(**asset_type_json)


@pytest.fixture
def topic_area():
    return TopicArea.objects.create(**topic_area_json)
