#!/bin/bash
export DJANGO_SUPERUSER_PASSWORD='admin'
echo DJANGO_SETTINGS_MODULE $DJANGO_SETTINGS_MODULE
python manage.py makemigrations knowledgebase
python manage.py migrate
python manage.py createsuperuser --username admin --email admin@admin.com --no-input
python manage.py runserver 0.0.0.0:8000
