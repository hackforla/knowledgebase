from django.urls import reverse
import pytest
from django.test import Client

client = Client()

pytestmark = pytest.mark.django_db
ASSET_TYPE_URL = reverse("asset-type-list")
TOPIC_AREA_URL = reverse("topic-area-list")
PHASE_URL = reverse("phase-list")
ASSET_CATEGORY_URL = reverse("asset-category-list")


def test_asset_category(asset_category):
    response = client.get(ASSET_CATEGORY_URL)
    found_asset_category = False
    # Iterate through the response
    for item in response.data:
        asset_category_name = item["name"]
        if (
            item["id"] == asset_category.id
            and asset_category_name == asset_category.name
        ):
            found_asset_category = True
            break
    assert found_asset_category


def test_topic_area(topic_area):
    response = client.get(TOPIC_AREA_URL)
    found_topic_area = False
    for item in response.data:
        topic_area_name = item["name"]
        if item["id"] == topic_area.id and topic_area_name == topic_area.name:
            found_topic_area = True
            break
    assert found_topic_area


def test_phase(phase):
    response = client.get(PHASE_URL)
    found_phase_name = False
    for item in response.data:
        phase_name = item["name"]
        if item["id"] == phase.id and phase_name == phase.name:
            found_phase_name = True
            break
    assert found_phase_name
