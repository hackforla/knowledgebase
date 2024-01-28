import csv
import json

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
            if index > 5:
                break
    return data


# Driver Code

# Decide the two file paths according to your
# computer system
csvFilePath = r"assets.csv"

# Call the make_json function
tally = 0
json_data = get_json(csvFilePath)


def run():
    from kb.models import (
        Asset,
        AssetCategory,
        AssetGroup,
        AssetType,
        AssetGroupTopicArea,
        Phase,
        TopicArea,
    )

    Asset.objects.all().delete()
    AssetGroup.objects.all().delete()
    AssetType.objects.all().delete()
    TopicArea.objects.all().delete()
    tally = 0
    for key, value in json_data.items():
        asset_category = AssetCategory.objects.filter(name="Document").first()
        asset_type, _ = AssetType.objects.update_or_create(
            asset_category=asset_category,
            name=value["Asset_Type"],
        )
        topic_area, _ = TopicArea.objects.update_or_create(
            name=value["Topic"],
        )
        asset_group, _ = AssetGroup.objects.update_or_create(
            name=value["Asset_Name"],
        )
        phase = Phase.objects.filter(name="Draft").first()
        Asset.objects.update_or_create(
            title=value["Asset_Name"],
            asset_group=asset_group,
            asset_type=asset_type,
            slug=value["Asset_Name"],
            phase=phase,
            google_id=key,
        )
        AssetGroupTopicArea.objects.update_or_create(
            asset_group=asset_group,
            topic_area=topic_area,
        )

        print("topic: ", topic_area)
        tally += 1
        if tally > 5:
            break

    print("Assets", Asset.objects.all())


if __name__ == "__main__":
    run()
