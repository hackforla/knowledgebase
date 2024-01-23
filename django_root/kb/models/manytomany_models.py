from .asset_models import Asset
from people_depot.models import AbstractBaseModel, User
from django.db import models
from django.contrib import admin

# __init__.py imports all models in this file

# Many to many models come in triplets. 1) The model itself, 2) the inline admin class, 3) the admin class itself.


# Asset Group User
class AssetUser(AbstractBaseModel):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, default="user")

    class Meta:
        unique_together = (
            "asset",
            "user",
        )

    def __str__(self):
        return self.asset.__str__() + " / " + self.user.__str__()




