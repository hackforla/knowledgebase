from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist

# Register your models here.
from .models import Gdoc, Author, GdocAuthor, GdocAuthorInline, GdocAdmin, AuthorAdmin, PracticeArea
admin.site.register(Gdoc, GdocAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(GdocAuthor)
admin.site.register(PracticeArea)


