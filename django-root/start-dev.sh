#!/bin/bash
source set-dev-settings.sh
echo Starting dev
if [ -z "$VIRTUAL_ENV" ]; then
    echo "Activating virtual environment for this script"
    source venv/bin/activate
    echo "Recommended: run 'source ./activate.sh' from terminal"
fi
if [ -z "$VIRTUAL_ENV" ]; then
    echo "You must be in a virtual environment to run this script"
    exit 1
fi
source ./start.sh 8001
