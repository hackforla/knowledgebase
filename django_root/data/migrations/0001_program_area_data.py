from django.db import migrations
from data.program_area_data import ProgramAreaData
print("001_program_area_data debug")


class Migration(migrations.Migration):

    initial = True
    dependencies = [
        ('django_kb_app', '0001_initial')
    ]

    operations = [
        migrations.RunPython( ProgramAreaData.update, migrations.RunPython.noop )
    ]
