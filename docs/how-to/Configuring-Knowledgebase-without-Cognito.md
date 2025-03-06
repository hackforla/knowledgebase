# How to configure Knowledgebase Locally
- Create a .env.local or .env.local
```
cd django_root
# pick one command from below
cp .env.local-example .env.local
cp .env.docker-example .env.docker
```
- modify .env.local or .env.docker to comment out COGNITO variable assignments
# Logging into Knowledgebase locally
- Open app with this url: `http://localhost:8001/accounts` . If you get a route does not exist error, then do  `http://localhost:8001/accounts/login`.  
- Press "Continue" on the next screen with title "Sign in Via Amazon Cognito" or similar.
- You will be prompted to sign in (to the user pool).  If you have an account, sign in and skip all the steps below except the last one.
- Click "Sign Up"
- The system will prompt you for username and password.  Amazon will send a verification code to the email you entered.  You can enter a bogus account in which case you will need to follow steps in Managing Users and User Pools to set Email verified to true.
# Logging in locally
- Log into admin: `https://localhost:8001/admin`.
- Look at .env.local or .env.docker for the name of the admin account that is created by default
- Log in as that user
- Create a new user
- Associate the user with other records
- Log out
- Log into admin again: `https://localhost:8001/admin`.  Use the new credentials.  
