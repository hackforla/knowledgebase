# Generated by Django 4.2.7 on 2024-02-20 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("people_depot", "0002_organization"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="organization",
            name="uuid",
        ),
        migrations.AddField(
            model_name="organization",
            name="id",
            field=models.BigAutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
