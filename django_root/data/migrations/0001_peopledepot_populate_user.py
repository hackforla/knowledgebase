from data.people_depot.user_data import UserData

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("kb", "0003_assettype")]
    operations = [UserData.update_users_from_pd()]
