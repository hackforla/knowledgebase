# HfLA Knowledgebase Webb App
The Knowledgebase App helps Hack for LA manage it's documentation. It includes:
- Associating a Google doc with a topic for the purposes of filtering and listing by section
- Setting one Google doc to be the primary document of a topic for purposes of filtering and listing by primary section
- Associating Google docs with practice areas, technologies, contributors that are maintained separately (by the People Depot)
- Associating files and links with their Google document
- Managing review and approval status of docs
- Tracking Google doc versions
- Adding a list of the contributors for a document with details to the document's web page
- Converting contributors' Google Docs into website pages

The API should allow for:
- filtering documents by contributor, practice area, technology, and topic (by section or by primary section)
- getting the review status of a document
- viewing a particular version (draft, in review, or approved) version of a document

Other capability
- Provide authorization to manage Knowledgebase users


# Features
## Google Document Features
# Technical Documentation
# Technical Implementation
## People Depot Replication with SSO
People Depot data is replicated when user logs in.
### User Profile
1. User attempts to login using kb url.
2. If user is configured for SSO
   - user is redirected to login
   - user logs in
   - Cognito calls kb callback with parameters necessary to derive token using Cognito algorithm.  Token is stored in variable.
   - /sync is called which calls update_all_from_pd.  This is configured using LOGIN_REDIRECT_URL
3. If user is not configured for SSO
   - user is drected to kb login page
   - user logs in using local account
   - token is derived using local algorithm.  Token is stored in variable.
4. /sync url is called.  This is configured in LOGIN_REDIRECT_URL
5. sync url triggers call to update_all_from_pd
6. update_all_from_pd 
   6.1 calls update_practice_area_from_pd
     - gets practice area data from https://<people depot server>/practice-areas w
     - data returned is used to create and update practice area records 
   6.2 calls update_user_profile_from_pd
     - gets current user data from https://<people depot server>/profile with token in header
     - data returned is used to create or update information for current user
   6.3 calls update_users_from_pd
     - gets current user data from https://<people depot server>/users with token in header
     - data returned is used to create or update groups and users
### 
1. User attempts to login using kb url.
2. gets token from  https://<people depot server>/login that passes entered user and password
3. 

## People Depot without SSO
## Servers
- Javascript service for converting a Google doc into a markdown and placed in a location to be picked up by Jekyll Hack for LA website.
- Django app to implement the Knowledge Base Features
- Interacts with Jekyll server
- Interacts with People Depot

# User Documentation
What features needs to be covered:
- List of supported Google Doc features
- Security configuration


















OLD CONTENT
This tool is a webapp that lets Hack for LA convert contributors' Google documents into Markdown that Hack for LA then uses as website content.  Hack for LA's site uses Jekyll, a library which converts the Markdown into HTML.  Contributors must be familiar with Google Docs, but are not required to know markdown.  For a complete list of the supported Google Doc features, see xxxxx.

The web application allows user to:
- convert one Google document
- convert all Google documents in a specific Google folder
- manage documents in the draft, in review, and production stages of development

The web app allows admins to manage user access to the web app.

The web application provides APIs for the Hack for LA website to use information to view, filter, and display the content.