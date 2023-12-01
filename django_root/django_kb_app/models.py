# todo: return authors
import uuid
from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.contrib import admin

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models



class AbstractBaseModel(models.Model):
    """
    Base abstract model, that has `uuid` instead of `uuid` and included `created_at`, `updated_at` fields.
    """
    
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        abstract = True



class AbstractBaseModelUuid(AbstractBaseModel):
    """
    Base abstract model, that has `uuid` instead of `uuid` and included `created_at`, `updated_at` fields.
    """

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        abstract = True

    def __repr__(self):
        return f"<{self.__class__.__name__} {self.uuid}>"


class AbstractBaseModelId(AbstractBaseModel):
    """
    Base abstract model, that has `uuid` instead of `uuid` and included `created_at`, `updated_at` fields.
    """

    id = models.BigAutoField(primary_key=True)
    
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    class Meta:
        abstract = True

    def __repr__(self):
        return f"<{self.__class__.__name__} {self.uuid}>"

class User(PermissionsMixin, AbstractBaseUser, AbstractBaseModelUuid):
    """
    Table contains cognito-users & django-users.

    PermissionsMixin leverages the built-in django model permissions system
    (which allows to limit information for staff users via Groups).
    Note: Django-admin user and app user are not split in different tables because of simplicity of development.
    Some libraries assume there is only one user model, and they can't work with both.
    For example, to have a history log of changes for entities - to save which
    user made a change of object attribute, perhaps, auth-related libs, and some
    other.
    With current implementation, we don't need to fork, adapt and maintain third party packages.
    They should work out of the box.
    The disadvantage is - cognito-users will have unused fields which always empty. Not critical.
    """

    username_validator = UnicodeUsernameValidator()

    # Common fields #
    # For cognito-users username will contain `sub` claim from jwt token
    # (unique identifier (UUID) for the authenticated user).
    # For django-users it will contain username which will be used to login into django-admin site
    username = models.CharField(
        "Username", max_length=255, unique=True, validators=[username_validator]
    )
    is_active = models.BooleanField("Active", default=True)

    # Cognito-user related fields #
    # some additional fields which will be filled-out only for users registered via Cognito
    pass

    # Django-user related fields #
    # password is inherited from AbstractBaseUser
    email = models.EmailField("Email address", blank=True)  # allow non-unique emails
    is_staff = models.BooleanField(
        "staff status",
        default=True,
        help_text="Designates whether the user can log into this admin site.",
    )

    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)

    # desired_roles = models.ManyToManyField("Role")
    # availability = models.IntegerField()  # not in ERD, is a separate table. Want to confirm to remove this
    # referred_by = models.ForeignKey(referrer, on_delete=models.PROTECT) # FK to referrer

    linkedin_account = models.CharField(max_length=255, blank=True)
    github_handle = models.CharField(max_length=255, blank=True)
    slack_id = models.CharField(max_length=11, blank=True)


    # conduct = models.BooleanField()  # not in ERD. Maybe we should remove this

    objects = UserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "preferred_email"
    REQUIRED_FIELDS = ["email"]  # used only on createsuperuser

    @property
    def is_django_user(self):
        return self.has_usable_password()

    def __str__(self):
        return f"{self.email}"


class Gdoc(AbstractBaseModelUuid):
    google_uuid = models.CharField(max_length=100, unique=True, blank=False, default="")
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
            "uuid": self.uuid,
            "google_uuid": self.google_uuid,
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




class Author(AbstractBaseModelUuid):
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


class GdocAuthor(AbstractBaseModelUuid):
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


class PracticeArea(AbstractBaseModelId):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name

class ProgramArea(AbstractBaseModelId):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)
        
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Phase(AbstractBaseModelUuid):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class Technology(AbstractBaseModelUuid):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name


class Tool(AbstractBaseModelUuid):
    name = models.CharField(
        max_length=70,
        blank=False,
        unique=True,
    )

    def __str__(self):
        return self.name
