You cannot do this once knowledgebase is deployed someplace other than your machine or Docker.  You can do this if you make a change to models.py and then get errors when you run makemigrations and migrate. 

1. Drop all tables under public schema
1. Remove django_kp_app/migrations directory using gui or with command `rm -rf django_kb_app/migrations`
1. Starting Docker (or running ./start-dev.sh locally) will automatically regenerate migrate scripts.
1. localhost:8000/admin
1. Log in with admin for username and password