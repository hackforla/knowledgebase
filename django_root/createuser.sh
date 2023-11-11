#!/bin/bash
# Create a new user
export DJANGO_SUPERUSER_PASSWORD='kbadmin'
echo DJANGO_SETTINGS_MODULE $DJANGO_SETTINGS_MODULE
python manage.py createsuperuser --username kbadmin --email admin@x.com --no-input 
