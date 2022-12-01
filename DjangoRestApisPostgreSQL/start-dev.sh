#!/bin/bash
export DJANGO_SETTINGS_MODULE=DjangoRestApisPostgreSQL.dev_settings
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --username admin --email admin@admin.com --no-input
python manage.py runserver 0.0.0.0:8000
