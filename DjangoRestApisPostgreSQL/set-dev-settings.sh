#!/bin/bash
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" != "true" ]; then
    echo "Error, script not sourced.  Please run 'source ./set-dev-settings.sh'"
    exit 1
fi
export DJANGO_SETTINGS_MODULE=DjangoRestApisPostgreSQL.dev_settings
