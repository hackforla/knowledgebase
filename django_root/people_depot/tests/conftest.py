import pytest

# fmt: off
from ..models import (
    Organization)
# fmt: on

organization_json = {"name": "Test name organization"}


@pytest.mark.django_db
@pytest.fixture
def organization():
    return Organization.objects.create(**organization_json)
