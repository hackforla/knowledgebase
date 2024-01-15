from django.contrib import admin
from django.core.exceptions import FieldDoesNotExist
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.forms import UserChangeForm as DefaultUserChangeForm
from django.contrib.auth.forms import UserCreationForm as DefaultUserCreationForm
from django.contrib.auth.forms import UsernameField

from kb.models import AssetUserInline


# Register your models here.
from .models import PracticeArea, Tool, User

admin.site.register(PracticeArea)
admin.site.register(Tool)


class UserCreationForm(DefaultUserCreationForm):
    class Meta(DefaultUserCreationForm.Meta):
        model = User


class UserChangeForm(DefaultUserChangeForm):
    class Meta(DefaultUserCreationForm.Meta):
        model = User
        fields = "__all__"
        field_classes = {"username": UsernameField}


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    list_display = ("name", "email")
    search_fields = ["name", "email"]
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "email",
                    "password",
                )
            },
        ),
        (
            "Profile",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    # "gmail",
                    # "preferred_email",
                    # "current_job_title",
                    # "target_job_title",
                    # "current_skills",
                    # "target_skills",
                    "linkedin_account",
                    "github_handle",
                    "slack_id",
                    # "phone",
                    # "texting_ok",
                    # "time_zone",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important_dates",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
    readonly_fields = ("username", "email", "created_at", "updated_at")
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password",
                    "password2",
                ),
            },
        ),
    )
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ("username", "is_staff", "is_active")
    list_filter = ("username", "email")

    # Display assets for this user
    inlines = [AssetUserInline]
