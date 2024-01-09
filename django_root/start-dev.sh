#!/bin/bash
# Check if script is sourced
(return 0 2>/dev/null) && sourced="true" || sourced="false"
if [ "$sourced" != "true" ]; then
    echo "Error, script not sourced.  Please run 'source ./start-dev.sh'"
    return 1
fi

if [[ ! -e ".env.local" ]]; then
    echo "Error, .env.local not found.  Please run 'cp .env.local-example .env.local'"
    return 1
fi
source loadenv.sh .env.local
echo Settings $DJANGO_SETTINGS_MODULE / $DATABASE_HOST

# Set VENV_DIR if not set
if [ -z $VENV_DIR ]; then
  export VENV_DIR=venv
fi

echo Starting dev $DATABASE_HOST

# Attempt to activate
if [ -z "$VIRTUAL_ENV" ]; then
    echo "Activating virtual environment for this script"
    source $VENV_DIR/bin/activate
    echo "Recommended: pythorun 'source ./activate.sh' from terminal"
fi

# Exit if not successfully activated
if [ -z "$VIRTUAL_ENV" ]; then
    echo "You must be in a virtual environment to run this script"
    exit 1
fi
source ./start.sh 8001