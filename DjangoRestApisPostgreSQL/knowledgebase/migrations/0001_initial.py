# Generated by Django 4.1.2 on 2022-12-23 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Gdoc",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("google_id", models.CharField(max_length=100, unique=True)),
                ("title", models.CharField(default="", max_length=70)),
                ("description", models.CharField(default="", max_length=200)),
                ("slug", models.SlugField()),
                ("status", models.CharField(default="draft", max_length=10)),
                ("published", models.BooleanField(default=False)),
            ],
        ),
    ]
