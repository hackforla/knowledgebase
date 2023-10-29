# todo: return authors

from django.db import models
from django.db.models.constraints import UniqueConstraint


class Gdoc(models.Model):
    google_id = models.CharField(max_length=100, unique=True, blank=False, default="")
    title = models.CharField(max_length=70, blank=False, default="")
    description = models.CharField(max_length=200, blank=False, default="")
    slug = models.CharField(max_length=200, blank=False, default="")
    active = models.BooleanField(blank=False, default=False)
    phase = models.ForeignKey("Phase", on_delete=models.PROTECT, blank=False)
    published = models.BooleanField(default=False)
    practiceAreas = models.ManyToManyField("PracticeArea", blank=True)
    programAreas = models.ManyToManyField("ProgramArea", blank=True)
    tools = models.ManyToManyField("Tool", blank=True)
    technologies = models.ManyToManyField("Technology", blank=True)

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
            "practiceAreas": [pa.name for pa in self.practiceAreas.all()],
            "programAreas": [pa.name for pa in self.programAreas.all()],
            "tools": [t.name for t in self.tools.all()],
            "technologies": [t.name for t in self.technologies.all()],
        }

    def __str__(self):
        return self.title + "(" + self.slug + ") " + self.phase.name


from django.contrib import admin


class Author(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )
    email = models.EmailField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class GdocAuthor(models.Model):
    gdoc = models.ForeignKey(Gdoc, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, default="author")

    class Meta:
        unique_together = (
            "gdoc",
            "author",
        )

    def __str__(self):
        return self.gdoc.__str__() + " / " + self.author.__str__()


class GdocAuthorInline(admin.TabularInline):
    model = GdocAuthor
    extra = 5


class GdocAdmin(admin.ModelAdmin):
    inlines = [GdocAuthorInline]
    list_display = ("title", "slug", "phase", "published")
    list_filter = ["phase", "published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}


class AuthorAdmin(admin.ModelAdmin):
    inlines = [GdocAuthorInline]
    list_display = ("name", "email")
    search_fields = ["name", "email"]


class PracticeArea(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name

class ProgramArea(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Phase(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class Technology(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class Tool(models.Model):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name
