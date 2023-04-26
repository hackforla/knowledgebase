outputDir=$1
if [ -z "$outputDir" ]; then
  echo "Usage: $0 <outputDir>"
  exit 1
fi
ts-node utils/gdocs2md/scripts/generate-elements $outputDir

