import csv
import json
import traceback

from psycopg2 import IntegrityError

print("here")


# Function to convert a CSV to JSON
# Takes the file paths as arguments
def get_json(csvFilePath):
    # create a dictionary
    data = {}

    # Open a csv reader called DictReader
    print("csvFilePath: ", csvFilePath)
    with open(csvFilePath, encoding="utf-8") as csvf:
        csvReader = csv.DictReader(csvf)

        for index, row in enumerate(csvReader):
            # Assuming a column named 'No' to
            # be the primary key
            # Topic, Asset_Name, Asset_Category, Asset_Type

            data[index] = row

    return data


# Driver Code

# Decide the two file paths according to your
# computer system
csvFilePath = r"assets.csv"

# Call the make_json function
tally = 0
print("getting json ")
json_data = get_json(csvFilePath)
print("got json")


def run():
    print("running")
    from kb.models import (
        Asset,
        AssetCategory,
        AssetGroup,
        AssetType,
        AssetGroupTopicAreas,
        Phase,
        TopicArea,
    )

    Asset.objects.all().delete()
    AssetGroup.objects.all().delete()
    AssetType.objects.all().delete()
    TopicArea.objects.all().delete()
    for key, value in json_data.items():
        asset_category = AssetCategory.objects.filter(name="Document").first()
        asset_type, _ = AssetType.objects.update_or_create(
            asset_category=asset_category,
            name=value["Asset_Type"],
        )
        topic_area, _ = TopicArea.objects.update_or_create(
            name=value["Topic"],
        )
        asset_name = value["Asset_Name"]
        try:
            print("Adding asset group: ", asset_name)
            asset_group = AssetGroup.objects.create(
                name=asset_name,
                group_version=1,
            )
        except Exception as e:
            # Check if the exception is related to the UNIQUE constraint you want to catch
            if "UNIQUE constraint failed" in str(e):
                # Handle the specific case where the UNIQUE constraint is violated
                max_group_version_obj = AssetGroup.objects.filter(
                    name=asset_name
                ).latest("group_version")
                max_group_version = max_group_version_obj.group_version
                print("max_group_version.group_version: ", max_group_version)
                asset_group = AssetGroup.objects.create(
                    name=asset_name,
                    group_version=max_group_version + 1,
                )
            else:
                raise
        phase = Phase.objects.filter(name="Draft").first()

        Asset.objects.update_or_create(
            title=value["Asset_Name"],
            asset_group=asset_group,
            asset_type=asset_type,
            slug=value["Asset_Name"],
            phase=phase,
            google_id=key,
        )
        AssetGroupTopicAreas.objects.update_or_create(
            asset_group=asset_group,
            topic_area=topic_area,
        )

        print("topic: ", topic_area)
    print("Asset.objects.count(): ", Asset.objects.count())


try:
    # Your script logic here
    print("about to run")
    run()
    print("ran")
except Exception as e:
    # Print the exception traceback
    traceback.print_exc()
    print("Exception: ", e)
    print("Oops! An exception occurred.")
    # Optionally, you can raise the exception again to halt script execution
    raise
