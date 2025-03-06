# How to configure Knowledgebase for Cognito
- Obtain values for these COGNITO_AWS_REGION, COGNITO_USER_POOL_NAME, COGNITO_USER_POOL, COGNITO_CLIENT_ID, and if applicable,COGNITO_CLIENT_SECRET from a development lead.  Alternatively, see [Appendix A](#appendix-a-how-to-create-a-cognito-user-pool-and-cognito-app-client) to create your own user pool and obtain values for the variables from your own user pool.
- from terminal copy .env.local-example to .env.local or .env.docker-example to .env.docker.  
```
cd django_root
# pick one command from below
cp .env.local-example .env.local
cp .env.docker-example .env.docker
```
- modify .env.local or .env.docker to uncommentout COGNITO variable assignments and modify for values determined.  If COGNITO_CLIENT_SECRET has no value, leave it commented out.
# Logging into Knowledgebase configured for Cognito
- Open app with this url: `http://localhost:3000/accounts` . If you get a route does not exist error, then do  `http://localhost:3000/accounts/login`.  
- Press "Continue" on the next screen with title "Sign in Via Amazon Cognito" or similar.
- You will be prompted to sign in (to the user pool).  If you have an account, sign in and skip all the steps below except the last one.
- Click "Sign Up"
- The system will prompt you for username and password.  Amazon will send a verification code to the email you entered.  You can enter a bogus account in which case you will need to follow steps in Managing Users and User Pools to manually verify.
# Logging in locally
- Log into admin: `https://localhost:8001/admin`.
- Look at .env.local or .env.docker for the name of the admin account that is created by default
- Log in as that user
- Create a new user
- Associate the user with other records
- Log out
- Log into admin again: `https://localhost:8001/admin`.  Use the new credentials.  
# Appendix A: How to create a Cognito User Pool and Cognito app client

## **Step  1: Sign in or create an Amazon Cognito root account**

If you already have a root account, skip these steps.
1. Go to https://console.aws.amazon.com/cognito/
2. Click **"Sign in as Root User"**
3. Make sure root user is checked.
4. Enter credentials or click **"
5. Follow instructions

## **Step 2: Create an Amazon Cognito User Pool**

1. **Sign in to AWS Console**  
   - Go to [AWS Cognito](https://console.aws.amazon.com/cognito/)
   - Click **"Sign in as Root User"**.  
   - Make sure root user is checked.
   - If you have an AWS root account, provide AWS root user email address.  If you don't have an AWS account, click "**Create AWS Account** and follow instructions. 
3. **Set Up the User Pool**  
After signing in or creating an AWS account:
   - Click **"Manage User Pools"** if user pools are not displayed.
   - Click **"Create user pool"**
   - **User Pool Name:** Enter a unique name (e.g., `peopledepot`)
   - Click **"Step through settings"**

4. **Configure Sign-in Options**  
   - Under **"How do you want your users to sign in?"**, choose:
     - Email (recommended) or Username
   - Check **"Allow email addresses"** if you want users to sign in with email.

5. **Set Up Security and Password Policy**  
   - Set up a password policy (e.g., require numbers, special characters, etc.).
   - Configure **Multi-Factor Authentication (MFA)** if required.

6. **Define User Attributes**  
   - Select standard attributes like `email`, `name`, or add custom attributes if needed.

7. **Create a User Pool**  
   - Click **"Next"** and configure tags, devices, and triggers if needed.
   - Click **"Create pool"**.

---

### **Step 2: Create an App Client**

1. **Navigate to App Integration**  
   - In the Cognito User Pool you just created, go to the **"App Integration"** section.
   - Click **"App clients"** → **"Add an app client"**.

2. **Configure the App Client**  
   - **App Client Name**: Enter a name (e.g., `my client`).
   - **Enable authentication flows**:
     - Enable `ALLOW_USER_SRP_AUTH` and `ALLOW_REFRESH_TOKEN_AUTH`.
   - Click **"Create app client"**.

---

### **Step 3: Configure App Client and Domain**

1. **Set Up a Hosted UI (Optional)**
   - Under **"App integration"**, click **"Domain name"**.
   - Enter a domain prefix (e.g., `myapp-auth`).
   - Click **"Save changes"**.

2. **Set Up Redirect URLs**  
   - In the **"App client settings"**:
     - Set **"Callback URLs"** to your frontend URL (e.g., `localhost:8001/auth/callback`).
     - Set **"Sign out URLs"** to `localhost:/auth/logout`.
     - Enable `Authorization code grant` and `Implicit grant`.

3. **Save and Deploy**  
   - Click **"Save changes"**.
   - Your Cognito User Pool and App Client are now ready!
# Appendix B: Managing Users, User Pools, and Apps
- Log into the user account you created in Appendix A using https://console.aws.amazon.com/cognito.
- Click "User pools" if required
- Click on the user pool you created
- If you click Users, you can modify "Email verified" for a user to simulate entering a verification code
# Appendix C: Gmail Workaround for Creating Multiple User Accounts
See [Logging into Knowledgebase configured for Cognito](#logging-into-knowledgebase-configured-for-cognito).  This includes an option to Sign Up which creates a new account associated with the applicable pool.  If you want to create multiple users and be emailed a verification code, gmail lets you add a period (".") to the username or add +<anything>.  For instance, samsmith@gmail.com, sam.smith@gmail.com, and samsmith+foo@gmail.com will all go to the same gmail account.

