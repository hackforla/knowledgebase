#!/bin/bash
# Create a new user
export DJANGO_SUPERUSER_PASSWORD='admin'
echo DJANGO_SETTINGS_MODULE $DJANGO_SETTINGS_MODULE
python manage.py createsuperuser --username admin3 --email admin@x.com --no-input 
