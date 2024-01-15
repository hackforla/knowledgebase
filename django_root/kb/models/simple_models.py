# todo: return users
import uuid
from django.db import models
from django.contrib import admin

# __init__.py imports all models in this file


class AbstractBaseModel(models.Model):
    """
    Base abstract model
    """

    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        abstract = True


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
