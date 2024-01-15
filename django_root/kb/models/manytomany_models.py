from kb.models.simple_models import AssetGroup
from people_depot.models import AbstractBaseModel, User
from django.db import models
from django.contrib import admin

# Many to many models come in triplets. 1) The model itself, 2) the inline admin class, 3) the admin class itself.


# Asset Group User
class AssetGroupUser(AbstractBaseModel):
    assetGroup = models.ForeignKey(AssetGroup, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, default="user")

    class Meta:
        unique_together = (
            "assetGroup",
            "user",
        )

    def __str__(self):
        return self.assetGroup.__str__() + " / " + self.user.__str__()


class AssetGroupUserInline(admin.TabularInline):
    model = AssetGroupUser
    extra = 5


class AssetGroupUserAdmin(admin.ModelAdmin):
    inlines = [AssetGroupUserInline]
    list_display = ("title", "slug", "phase", "published")
    list_filter = ["phase", "published"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
