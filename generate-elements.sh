outputdir=$1
if [ -z "$outputdir" ]; then
  echo "Usage: $0 <outputdir>"
  exit 1
fi
ts-node utils/gdocs2md/scripts/generate-elements $@

