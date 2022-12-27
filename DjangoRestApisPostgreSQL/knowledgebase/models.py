# todo: return authors

from django.db import models
from django.db.models.constraints import UniqueConstraint


class Gdoc(models.Model):
    google_id = models.CharField(max_length=100, unique=True, blank=False, default='')
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    slug = models.CharField(max_length=200,blank=False, default='')
    status = models.CharField(max_length=10, default='draft')
    published = models.BooleanField(default=False)
    practiceAreas = models.ManyToManyField('PracticeArea', blank=True)
    tools = models.ManyToManyField('Tool', blank=True)
    technologies = models.ManyToManyField('Technology', blank=True)

    class Meta:
        unique_together = ('slug', 'status',)

    def to_json(self):
        return {
            'id': self.id,
            'google_id': self.google_id,
            'title': self.title,
            'description': self.description,
            'slug': self.slug,
            'status': self.status,
            'published': self.published,
            'practiceAreas': [pa.name for pa in self.practiceAreas.all()],
            'tools': [t.name for t in self.tools.all()],
            'technologies': [t.name for t in self.technologies.all()],
        }   
        
    def __str__(self):
        return self.title + "(" + self.slug + ") " + self.status

from django.contrib import admin

class Author(models.Model):
    name = models.CharField(max_length=70, blank=False, unique = True, )
    email = models.EmailField(max_length=70, blank=False, unique = True,)

    def __str__(self):
        return self.name

class GdocAuthor(models.Model):
    gdoc = models.ForeignKey(Gdoc, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, default='author')
    class Meta:
        unique_together = ('gdoc', 'author',)

    def __str__(self):
        return self.gdoc.__str__() + " / " + self.author.__str__()
        

class GdocAuthorInline(admin.TabularInline):
    model = GdocAuthor
    extra = 5

class GdocAdmin(admin.ModelAdmin):
    inlines = [GdocAuthorInline]
    list_display = ('title', 'slug', 'status', 'published')
    list_filter = ['status', 'published']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}

class AuthorAdmin(admin.ModelAdmin):
    inlines = [GdocAuthorInline]
    list_display = ('name', 'email')
    search_fields = ['name', 'email']

class PracticeArea(models.Model):
    name = models.CharField(max_length=70, blank=False, unique = True, )
    def __str__(self):
        return self.name

class Technology(models.Model):
    name = models.CharField(max_length=70, blank=False, unique = True, )
    def __str__(self):
        return self.name

class Tool(models.Model):
    name = models.CharField(max_length=70, blank=False, unique = True, )
    def __str__(self):
        return self.name