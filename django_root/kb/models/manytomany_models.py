from kb.models.simple_models import TopicArea
from .asset_models import Asset, AssetGroup
from people_depot.models import AbstractBaseModel, User, PracticeArea,Tool
from django.db import models

# __init__.py imports all models in this file

# Many to many models come in triplets. 1) The model itself, 2) the inline admin class, 3) the admin class itself.


class AssetGroupTopicArea(AbstractBaseModel):
    asset_group = models.ForeignKey(AssetGroup, on_delete=models.CASCADE)
    topic_area = models.ForeignKey(TopicArea, on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            "asset_group",
            "topic_area",
        )

    def __str__(self):
        return self.asset_group.__str__() + " / " + self.topic_area.__str__()



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

class AssetTool(AbstractBaseModel):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    tool = models.ForeignKey(Tool, on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            "asset",
            "tool",
        )

    def __str__(self):
        return self.asset.__str__() + " / " + self.tool.__str__()

class AssetPracticeArea(AbstractBaseModel):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    practice_area = models.ForeignKey(PracticeArea, on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            "asset",
            "practice_area",
        )

    def __str__(self):
        return self.asset.__str__() + " / " + self.practice_area.__str__()

