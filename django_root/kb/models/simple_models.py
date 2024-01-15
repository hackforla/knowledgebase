# todo: return users
import uuid
from django.db import models
from django.contrib import admin


class AbstractBaseModel(models.Model):
    """
    Base abstract model
    """

    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        abstract = True


class Asset(AbstractBaseModel):
    google_id = models.CharField(max_length=100, unique=True, blank=False, default="")
    title = models.CharField(max_length=70, blank=False, default="")
    description = models.CharField(max_length=200, blank=False, default="")
    slug = models.CharField(max_length=200, blank=False, default="")
    active = models.BooleanField(blank=False, default=False)
    phase = models.ForeignKey("Phase", on_delete=models.PROTECT, blank=False)
    published = models.BooleanField(default=False)
    tools = models.ManyToManyField("people_depot.Tool", blank=True)

    class Meta:
        unique_together = (
            "slug",
            "phase",
        )

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
    title = models.CharField(max_length=70, blank=False, default="")
    description = models.CharField(max_length=200, blank=False, default="")
    practiceAreas = models.ManyToManyField("people_depot.PracticeArea", blank=True)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "practiceAreas": [pa.name for pa in self.practiceAreas.all()],
        }

    def __str__(self):
        return self.title


class Phase(AbstractBaseModel):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class TopicArea(AbstractBaseModel):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class AssetType(AbstractBaseModel):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name
