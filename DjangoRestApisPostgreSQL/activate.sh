# return 0 will succeed if sourced, fail if not sourced
# 2>/dev/null will suppress the error message
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" != "true" ]; then
    echo "Error, script not sourced.  Please run 'source ./activate.sh'"
    exit 1
fi
source venv/bin/activate
echo "DjangoRestApisPostgreSQL/start.sh: Sourced OK"

