## Future Edits

Coming Soon - adjust headers, mysql. .env-docker-example

## Prerequisites
- The following tools need to be installed
  - Git
  - Python
  - Postgres
  - Python IDE (pycharm or vscode recommended)
  - Postgres UI (for example, DBVisualizer)

- Knowledge on these topics is helpful
  - **Git**
  - **Python** Click [here](https://python.swaroopch.com/) and read up to and including "Data Structures".  This will be enough to get you started.
  - **Django** Part 1 and Part 2 of ["Writing your first Django app"](https://docs.djangoproject.com/en/4.2/intro/tutorial01/) is recommended

=================================================================

## Knowledgebase / BOP Catalog Setup

### First Time Set up (Mac and Windows):

1. If using your account
   - Fork repository in github
   - Clone fork
   - Create a branch
1. If you have maintain privileges for this repo, just clone this repo directly

### Fix EOL (Windows only)
To avoid issues with Git line endings, disable Git EOL conversion before running the Docker script.<br>
From the bash terminal, type:
```
git config --global core.autocrlf false
git add --renormalize .
```
If you don't do this, after `docker-compose up`, you might get `./start-docker.sh: no such file or directory`.  Even if running locally, there may be issues if you don't do the above.

### Install Python Packages Locally (even if using Docker)

If running Docker, it is still recommended to install Python packages locally.  This will improve Intellisense and compile errors in IDE such as VSCode. 

- Create a virtual environment
- Activate the virtual environment
- Install Python packages.  From terminal, run:
```
cd django_root
pip install -r requirements.txt
```

You can either run locally or run using docker.  If you want to run locally see below.  If you have trouble running locally you can [run using docker](#using-docker)

### Running Locally
#### Install Python Packages Locally

```
cd django_root
pip install -r requirements.txt
```

### Starting App Locally
From terminal:

```
cd django_root
cp .env.local-example .env.local # only needs to be done once
source ./start-dev.sh
```
### Running Scripts Locally
- Open terminal
- From a terminal, run

```
cd django_root
source ./activate.sh
source ./loadenv.sh .env.local
```
- From terminal in previous steps, run Python or Django commands

### Using Docker
#### Install Python Packages Locally (optional)
Installing Python packages locally will improve Intellisense and compile errors in IDE such as VSCode. 
- Install Python locally
- From django_root directory:
```
pip install -r requirements.txt
```
#### Create Docker Image and Container
- Start Docker
- From the terminal, type:
```
docker build -t kb-web-image . # this only needs to be done once
docker-compose up
```

#### Manually Run Python or Django In Docker Terminal

If you need to open the Docker terminal to try some Django or Python commands:

- From Docker UI, open terminal in Docker for django-hfla-web container.
- From a terminal, run

```
cd django_root
source ./activate.sh
```
- From terminal in previous steps, run Python or Django commands




