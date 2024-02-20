from django.urls import reverse
import pytest
from django.test import Client

client = Client()

pytestmark = pytest.mark.django_db
ORGANIZATION_URL = reverse("organization-list")


def test_organization(organization):
    response = client.get(ORGANIZATION_URL)
    assert response.json()[0]["name"] == organization.name
