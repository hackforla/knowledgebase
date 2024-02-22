# todo: return users
import uuid
from django.db import models
from django.db.models.functions import Upper

from people_depot.models import AbstractBaseModel

# When you add a model, you need to add it to the __init__.py file


class Asset(AbstractBaseModel):
    google_id = models.CharField(max_length=100, blank=False, default="")
    title = models.CharField(max_length=70, blank=False, default="")
    description = models.CharField(max_length=200, blank=False, default="")
    slug = models.CharField(max_length=200, blank=False, default="")
    active = models.BooleanField(blank=False, default=False)
    phase = models.ForeignKey("Phase", on_delete=models.PROTECT, blank=False)
    asset_group = models.ForeignKey("AssetGroup", on_delete=models.PROTECT, blank=False)
    asset_type = models.ForeignKey("AssetType", on_delete=models.PROTECT, blank=False)
    organization = models.ForeignKey(
        "people_depot.Organization", on_delete=models.PROTECT, blank=False
    )
    published = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            "asset_group",
            "slug",
            "phase",
        )

        unique_together = ("asset_group", "title", "phase")

    def to_json(self):
        return {
            "id": self.id,
            "google_id": self.google_id,
            "title": self.title,
            "description": self.description,
            "slug": self.slug,
            "published": self.published,
            "tools": [t.name for t in self.tools.all()],
        }

    def __str__(self):
        return self.title + "(" + self.slug + ") " + self.phase.name


class AssetGroup(AbstractBaseModel):
    name = models.CharField(max_length=70, blank=False, default="")
    description = models.CharField(max_length=200, blank=False, default="")
    group_version = models.IntegerField(blank=False, default=1)

    class Meta:
        ordering = ["name", "group_version"]
        unique_together = ("name", "group_version")

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "practiceAreas": [pa.name for pa in self.practiceAreas.all()],
        }

    def __str__(self):
        return self.name


class AssetCategory(AbstractBaseModel):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    class Meta:
        verbose_name_plural = "asset categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class AssetType(AbstractBaseModel):
    asset_category = models.ForeignKey(
        "AssetCategory", on_delete=models.PROTECT, blank=False
    )
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    class Meta:
        ordering = ["asset_category__name", Upper("name")]

    def __str__(self):
        return self.name


# When you add a model, you need to add it to the __init__.py file
