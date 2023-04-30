outputdir=$1
if [ -z "$outputdir" ]; then
  echo "Usage: $0 <outputdir> --optional-args"
  exit 1
fi
ts-node utils/gdocs2md/scripts/generate-elements "$@" --savemarkdowntofile true --savemarkdowntogithub false
