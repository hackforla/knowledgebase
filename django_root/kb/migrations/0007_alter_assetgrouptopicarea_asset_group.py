# Generated by Django 4.2.7 on 2024-01-24 22:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("kb", "0006_rename_assetgroup_asset_asset_group_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assetgrouptopicarea",
            name="asset_group",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="kb.assetgroup"
            ),
        ),
    ]
