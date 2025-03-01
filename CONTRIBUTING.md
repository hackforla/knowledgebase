# Starting People Depot 
## Stopping processes running on needed ported
Follow these instructions if 5432, 5433, 8000, or 8001 are used by other applications.

1. If Postgresql is running for another app other than People Depot, kill Postgresql

For Mac
-  Stop Postgresql: `brew services stop postgresql`
- If it indicates a specific version was stopped (`Stopping ```postgresql@16```...`), 
then stop that version: `brew services stop postgresql@16`

For PC:
- ???

2. Repeat for 5433
3. Kill process running on 8000: `kill -9 (lsof -ti:8000)`
4. Repeat for 8001
5. If you think databases on port 5432 or 5433 were used for a different application, then reinitialize or change where ports are started

## Configure
- From terminal:
```
cd django_root
cp .env.local-example .env.local
```
- If you are using People Depot then check PEOPLE_DEPOT_URL is defined.  If not, check that it is commented out.
- If you are using Cognito for login, get values for Cognito variables from a development admin or 1password.com (if 
a HackForLA account has been setup).  You can also create your own Cognito domain if you want.  See ???

## Start People Depot
If you are not using People Depot APIs and don't want to set up replication from People Depot, then skip this section.

See https://hackforla.github.io/peopledepot/contributing/dev_environment/ for instructions on how to start People Depot.  For the first time, this will create a container with a Postgresql database on port 5432 and a Django web server on port 8000.  Subsequent starts will use the docker container, database, and web server and perform any necessary migrations to the database.

## Start Doc Conversion

## Start Knowledgebase
From terminal: `cd django_root`, then `source start-local.sh` or `source start-docker.sh`

