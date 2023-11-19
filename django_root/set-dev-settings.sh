#!/bin/bash
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" != "true" ]; then
    echo "Error, script not sourced.  Please run 'source ./set-dev-settings.sh'"
    exit 1
fi
# export DJANGO_SETTINGS_MODULE=django_project.settings
export DATABASE_HOST=localhost
export DATABASE_PORT=5433
export DJANGO_SUPERUSER=admin
export DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER@fake.com
export DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER