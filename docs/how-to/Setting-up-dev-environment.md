## Prerequisites
- The following tools need to be installed
  - Git
  - Python
  - Postgres (optional,if using Docker)
  - Python IDE (pycharm or vscode recommended)
  - Postgres UI (for example, DBVisualizer)

- Knowledge on these topics is helpful
  - **Git**
  - **Python** Click [here](https://python.swaroopch.com/) and read up to and including "Data Structures".  This will be enough to get you started.
  - **Django** Part 1 and Part 2 of ["Writing your first Django app"](https://docs.djangoproject.com/en/4.2/intro/tutorial01/) is recommended

=================================================================

## Knowledgebase Setup

### First Time Set up (Mac and Windows):

1. Fork repository in github
2. Clone the fork locally

### Fix EOL (Windows only)
To avoid issues with Git line endings, disable Git EOL conversion before running the Docker script.<br>
From the bash terminal, type:
```
git config --global core.autocrlf false
git add --renormalize .
```
If you don't do this, after `docker-compose up`, you might get `./start-docker.sh: no such file or directory`.  Even if running locally, there may be issues if you don't do the above.

### Run Using Docker
#### Install Python Packages Locally 

If running Docker, it is still recommended to install Python packages locally.  This will improve Intellisense and compile errors in IDE such as VSCode. 

- Create a virtual environment: 
- Activate the virtual environment
- Install Python packages

From terminal:
```
python -m venv venv
source venv/bin/activate # for Mac.  Windows uses differen command.
cd django_root
pip install -r requirements.txt
```
You can either run locally or run using docker.  If you want to run locally see below.  If you have trouble running locally you can [run using docker](#using-docker)

#### One time: build kb-web image
If the kb-web image has not been built, from terminal, run:
`./docker-compose-build.sh`
#### Start application
If the kb-web image has been built, from terminal, run:
```
docker-compose up
```

### Running Locally
From terminal:

```
cd django_root
cp .env.local-example .env.local # only needs to be done once
```
Check .env.local and adjust as necessary.
```
./start-dev.sh
```



