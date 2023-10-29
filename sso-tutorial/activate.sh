# return 0 will succeed if sourced, fail if not sourced
# 2>/dev/null will suppress the error message
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" = "true" ]; then
    source venv/bin/activate
    echo "django_project/start.sh: Sourced OK"
else
    echo "Error, script not sourced.  Please run 'source ./activate.sh'"
fi
