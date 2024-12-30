This Google Docs [guide](https://docs.google.com/document/d/1qFxrSftoWjoCoM7fUwTaRWGG5lzURu6rg6RDn70iqz0/edit) has generic steps when creating a new project.  Below steps are specific to knowledgebase project.  For People Depot or if the data is in a spreadsheet, look at instructions in HackForLA People Depot repo either in [main branch](https://github.com/hackforla/peopledepot/blob/main/docs/how-to/create-initial-data-migrations.md) or if not available look at https://github.com/ethanstrominger/peopledepot/blob/initial-data-migration-36/docs/how-to/create-initial-data-migrations.md.

# Setup
```
cd django-root
source ./activate.sh
source ./set-dev-settings.sh
```


# Autogenerating JSON
After the data has been entered into the database, you can use any of these commands to autogenerate JSON:

```
python3 manage.py dumpdata <app_name>.<model_name> > <filename>.json
python3 manage.py dumpdata <app_name> > <filename>.json
python3 manage.py dumpdata > <filename>.json
```

Examples:
```
python3 manage.py dumpdata knowledgebase.gdocs > fixtures/knowledgebase-gdocs.json
python3 manage.py dumpdata auth > auth.json
python3 manage.py dumpdata > alldata.json 
```

- Edit JSON file
  - **Format document:** Use your editor's autoformat for better readability.
  - **Remove extraneous non-json**: The JSON file may have output that is generated before the JSON data.
  - **Remove unneeded data:** Remove data for models if you don't want the data to be included.

Here's an example of dump of person data:

```
[
  {
    "model": "myapp.person",
    "pk": 1,
    "fields": {
      "first_name": "John",
      "last_name": "Snow"
    }
  },
  {
    "model": "myapp.person",
    "pk": 2,
    "fields": {
      "first_name": "Paul",
      "last_name": "McCartney"
    }
  }
]
```


# How To Autogenerate Security Groups and Permissions (Authentication and Authorization) JSON
Follow instructions above.  When running command to dumpdata, use this:
```
python3 manage.py dumpdata auth > auth.json
```

# Loading Data During Migration w/Data Directory 

1. Create a data and data/migrations directory below the top level Django directory (where manage.py exists)
2. Create empty __init__.py in data and data/migration directories
3. Add json files to data directory
4. Create your first script with a dependency on an existing migration script that creates a model.

Example code if store is the name of the app:
```
Script name: 0001_author_data.py

from django.db import migrations

def loadJsonData(__app, __schema_editor):
    print("Loading JSON data for books")
    call_command('loaddata','../author_data.json')
    
class Migration(migrations.Migration):
    dependencies = [("store", "0006_customer_data"),]
    operations = [ migrations.RunPython(loadJsonData),]
```
5. For each subsequent script do the same as above, but change dependencies to be the previous data script.  For example:
def loadJsonData(app, schema_editor):
```
...
...
class Migration(migrations.Migration):
    dependencies = [("store", "0006_customer_data"),]
    operations = [ migrations.RunPython(loadJsonData),]
```

## Manually Load Data
- Run a script or run commands from terminal to load data.

Example script:
```
source scripts/set_dev.sh
python3 manage.py loaddata <json data directory>/<filename>.json
```


# Resources
- [django 3.1 docs on initializing data](https://docs.djangoproject.com/en/3.1/howto/initial-data/)
- [Automating Data Seed for Tests](https://rmdra08.medium.com/automate-data-seeding-in-tests-for-django-applications-67369373d6b9)

