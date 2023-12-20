from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import (
    Gdoc,
    Author,
    GdocAuthor,
    GdocAdmin,
    AuthorAdmin,
    Phase,
    PracticeArea,
    ProgramArea,
    Technology,
    Tool,
    TopicArea
)

admin.site.register(Gdoc, GdocAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(GdocAuthor)
admin.site.register(Phase)
admin.site.register(PracticeArea)
admin.site.register(ProgramArea)
admin.site.register(Tool)
admin.site.register(Technology)
admin.site.register(TopicArea)
