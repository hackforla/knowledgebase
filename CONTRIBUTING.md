## Prerequisites

python
postgres
python IDE (pycharm or vscode recommended)
postgres IDE (for example, DBVisualizer)

## One Time Set up:

1. Fork repository in github
1. Clone fork
1. From terminal:

```
python3 -m venv venv
source ./activate.sh
pip install -r requirements.txt
```

## Start Server

From terminal:

```
source ./start-dev.sh
```

or

```
./start-dev.sh
```

## Activate Python

If you need to open the terminal for other reasons than running start-dev.sh, you can manually run:

```
source ./activate.sh
```

## Modifying Schema

1. Modify models.py.
1. Kill server started with ./start-dev.sh
1. `./start-dev.sh` will automatically migrate.

## Regenerating Migration Scripts

1. Kill server started with ./start-dev.sh
1. From postgres using postgres db: `delete from migrations where app='knowledgebase'
1. From postgres IDE: drop any tables that begin with postgres
1. Remove knowledgebase/migrations directory using gui or with command `rm -rf knowledgebase/migrations`
1. `./start-dev.sh` will automatically regenerate migrate scripts.
1. localhost:8000/admin
1. Log in with admin for username and password
1. Populate Gdoc table, set Google ID to `1rGLToDtbpnhKtkIcdcVQA3N3hWbyKFEs_BUmuD90VaE`
