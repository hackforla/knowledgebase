from kb.models.asset_models import AssetType


data = {
    "AssetCategory": [
        {"id": 1, "name": "Document"},
        {"id": 2, "name": "Spreadsheet"},
        {"id": 3, "name": "Website"},
        {"id": 4, "name": "Presentation"},
        {"id": 5, "name": "Image"},
        {"id": 6, "name": "Video"},
        {"id": 7, "name": "Diagram"},
        {"id": 8, "name": "Other"},
    ],
    "asset_type_with_category_name": [
        {"id": 1, "name": "Google Doc", "asset_category_name": "Document"},
        {"id": 2, "name": "rtf", "asset_category_name": "Document"},
        {"id": 3, "name": "Microsoft Word", "asset_category_name": "Document"},
        {"id": 4, "name": "pdf", "asset_category_name": "Document"},
        {"id": 5, "name": "csv", "asset_category_name": "Spreadsheet"},
        {"id": 6, "name": "Microsoft Excel", "asset_category_name": "Spreadsheet"},
        {"id": 7, "name": "Apple Numbers", "asset_category_name": "Spreadsheet"},
        {"id": 8, "name": "Google Shhet", "asset_category_name": "Spreadsheet"},
        {"id": 9, "name": "figma", "asset_category_name": "Diagram"},
        {"id": 10, "name": "Miro", "asset_category_name": "Diagram"},
    ],
}
category_lookup = {
    category["name"]: category["id"] for category in data["AssetCategory"]
}

# Set asset_type with asset_category_id
asset_type = []
for asset_type_with_category_name in data["asset_type_with_category_name"]:
    asset_type.append(
        {
            "id": asset_type_with_category_name["id"],
            "name": asset_type_with_category_name["name"],
            "asset_category_id": category_lookup.get(
                asset_type_with_category_name["asset_category_name"]
            ),
        }
    )


data[AssetType.__name__] = asset_type
