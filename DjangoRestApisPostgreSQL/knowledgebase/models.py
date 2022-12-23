from django.db import models


class Gdoc(models.Model):
    google_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    slug = models.SlugField(max_length=50)
    status = models.CharField(max_length=10, default='draft')
    published = models.BooleanField(default=False)