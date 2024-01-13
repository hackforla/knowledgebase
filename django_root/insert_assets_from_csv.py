import csv
import json


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
            print("index: ", index, row)
            data[index] = row
            if index > 5:
                break
    print("data: ", data[1])
    return data


# Driver Code

# Decide the two file paths according to your
# computer system
csvFilePath = r"assets.csv"

# Call the make_json function
tally = 0
json_data = get_json(csvFilePath)
for key, value in json_data.items():
    tally += 1
    print(key, json_data[key])
    if tally > 5:
        break
