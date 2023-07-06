# return 0 will succeed if sourced, fail if not sourced
# 2>/dev/null will suppress the error message
source venv/bin/activate
python3 manage.py dumpdata $1