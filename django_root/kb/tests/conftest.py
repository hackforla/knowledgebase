import pytest
from rest_framework.test import APIClient

# fmt: off
from ..models import (
    TopicArea
)
# fmt: on

asset_type_json = {"name": "Test asset type"}
topic_area_json = {"name": "Test Topic Area"}


@pytest.mark.django_db
@pytest.fixture(scope="function")
def topic_area():
    value = TopicArea.objects.create(name="Test Topic Area")
    return value
