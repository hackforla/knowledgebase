#!/bin/bash
echo debug password $DJANGO_SUPERUSER_PASSWORD
if [[ $1 != "" ]]; then
    port=$1
elif [[ $DJANGO_PORT != "" ]]; then
    port=$DJANGO_PORT
else
    port=8000
fi
echo Port is $port
echo DJANGO_SETTINGS_MODULE $DJANGO_SETTINGS_MODULE
python manage.py makemigrations django_kb_app
python manage.py migrate
python manage.py createsuperuser --username admin --email admin@admin.com --no-input
if [[ $DJANGO_SETTINGS_MODULE == *"dev_settings"* ]]; then
    echo .
    echo "******************************************************************************"
    echo "*                                                                            *"
    echo "*   TO MODIFY DATA, USE THE ADMIN INTERFACE AT http://localhost:8000/admin   *"
    echo "*   Local username: admin Password: admin                                    *"
    echo "*                                                                            *"
    echo "******************************************************************************"
    echo .
fi
python manage.py runserver 0.0.0.0:$port
