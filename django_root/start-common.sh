#!/bin/bash
# Called by start-dev.sh and start-docker.sh, which sets
#    - DATABASE_HOST
#    - DJANGO_SUPERUSER
#    - DJANGO_SUPERUSER_PASSWORD
#    - DJANGO_SUPERUSER_EMAIL
if [ $DJANGO_SETTINGS_MODULE == "" ]; then
  echo --- ERROR: DJANGO_SETTINGS_MODULE not set.  Exiting.
  return 1
fi

echo Admin user = $DJANGO_SUPERUSER email = $DJANGO_SUPERUSER_EMAIL Database port = $DJANGO_PORT
if [[ $1 != "" ]]; then
    port=$1
elif [[ $DJANGO_PORT != "" ]]; then
    port=$DJANGO_PORT
else
    port=8002
fi
echo Port is $port
echo DJANGO_SETTINGS_MODULE $DJANGO_SETTINGS_MODULE

echo
echo --- Executing python manage.py makemigrations ---
echo
python manage.py makemigrations
if [ $? -ne 0 ]; then
  echo --- ERROR: python manage.py makemigrations failed.  See errors above. ---
  return 1
fi

echo
echo --- Executing python manage.py migrate ---
echo
python manage.py migrate
if [ $? -ne 0 ]; then
  echo --- ERROR: python manage.py makemigrations failed.  See errors above. ---
  return 1
fi

echo Executing python manage.py shell to check if user exists
python manage.py shell -c "from people_depot.models import User; exists = (User.objects.filter(username='$DJANGO_SUPERUSER').exists()); sys.exit(0 if exists else 1)"
superuser_exists=$?

echo
echo
echo Super user $DJANGO_SUPERUSER
if [ $superuser_exists -eq 1 ]; then
  echo
  echo --- Executing python manage.py createsuperuser ---
  echo 
  python manage.py createsuperuser --username $DJANGO_SUPERUSER --email $DJANGO_SUPERUSER_EMAIL --no-input
else
  echo --- INFO: Skipping python manage.py createsuperuser - super user $DJANGO_SUPERUSER already exists.
fi
if [ $? -ne 0 ]; then
  echo --- ERROR: python manage.py createsuperuser failed.  See errors above.
  return 1
 fi

python manage.py runserver 0.0.0.0:$port
