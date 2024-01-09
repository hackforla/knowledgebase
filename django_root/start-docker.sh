#!/bin/bash
export DATABASE_HOST=db
export DATABASE_PORT=5432
export DJANGO_SUPERUSER=admin
export DJANGO_SUPERUSER_EMAIL=$DJANGO_SUPERUSER@fake.com
export DJANGO_SUPERUSER_PASSWORD=$DJANGO_SUPERUSER
export PEOPLE_DEPOT_URL="http://localhost:8000"
export PEOPLE_DEPOT_API_SECRET=people-depot-api-secret
export PEOPLE_DEPOT_API_KEY=people-depot-api-key
export DJANGO_SETTINGS_MODULE=core.settings
source ./start.sh 8000