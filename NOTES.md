# Terminology
TODO: Make less passive and less verbose
- Asset: any resource or content that can be accessed and read via the internet.  An asset is characterized by its accessibility through a unique link or identifier, allowing it to be easily retrieved or viewed by users of the app.  The asset can be viewed directly in the browser and/or using a client tool.  Assets are highly versatile and can encompass a wide range of items, including but not limited to: Google Docs, web pages, Miro Diagrams, Google Slides, Microsoft Powerpoint slides.


# Knowledgebase App Overview

The Knowledgebase App helps Hack for LA 
- maintain it's assets and related information.  See [data_values.md](docs/design/data_values.md) for details and examples of topic areas, asset groups, and other related information.
- managing draft, in review, and completed versions of an asset
- filtering:
   - filter by assets based on related information such as topic area, asset groups, and other related information
   - identifying a primary asset in an asset group for purposes of filtering
   - Identifying a primary asset in a topic area for purposes of filtering
- Google doc to web page conversion
  - Convert google doc to HTML
  - Add a section to the HTML that lists contributors and details
- Manage authorization of Knowledgebase users

## Related information

For more details see [data_values.md](docs/design/data_values.md).

Related information that is maintained in the Knowledge base app:
- topic area
- asset group
- asset category
- asset type

Related information that is maintained in People Depot:
- practice area
- technology
- contributors

# API Overview

The API should let a user:
- get a list of assets, contributors, practice areas, technologies, topic areas, asset types, asset categories, and asset groups
- filter assets by contributor, practice area, technology, topic area, asset type, asset category, and asset group
- filter an asset group by primary asset
- filter an asset group by topic area
- get the review status of a document

The API user must pick a version status - draft, in review, or approved - for any asset or assets they get. They can only get one version status at a time.




# Features
## Google Document Features

# Technical Implementation
## Maintenance with Django
## People Depot Replication with SSO

The Knowledgebase replicates the People Depot table when the user logs in. This is the log in flow:

1. User attempts to login using Knowledgebase url.
2. For a normal user, we configure the Knowledgebase for SSO, therefore:
   2.1 user is redirected to Cognito login
   2.2 user logs in to Cognito
   TODO: 2.3 Cognito and Knowledgebase work together to create a token
   2.4 Knowledgebase calls People Depot /profile API to validate the user.  If no such user exists,
   Knowledgebase shows an error screen.
3. For an internal developers who is using Knowledgebase without SSO:
   3.1 user is directed to Knowledgebase login page
   3.2 user logs in with username and password
   3.3 Knowledgebase calls People Depot /login API to validate username and password against People Depot
   3.4 Knowledgebase creates a token
5. Knowledgebase redirects the user to the /sync url.  This is configured in the dLOGIN_REDIRECT_URL environment variable.
6. The view associated with the /sync url, `sync_view()`, calls `update_all_from_pd()`, which:
   6.1 calls `update_user_profile_from_pd()`, which:
      6.1.1 gets current user data from `https://<people depot server>/profile` with token in header
      6.1.2 creates or updates the user's record
   6.2 calls `update_users_from_pd()`
      6.2.1 gets current user data from `https://<people depot server>/users` with token in header
      6.2.2 creates or updates the records for the users and security groups
   6.3 calls `update_practice_area_from_pd()`
      6.3.1 gets practice area data from `https://<people depot server>/practice-areas` (without a token)
      6.3.2 creates or updates the practice area records

## Related Servers

- Google doc conversion server. It converts a Google doc into markdown. We have written the backend for this server in javascript.
- Jekyll server. The Jekyll server converts the markdown to HTML for the Hack for LA website.
- People Depot API server

# User Documentation

What features needs to be covered:
- List of supported Google Doc features
- Security configuration
















OLD CONTENT
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


OLD CONTENT
This tool is a webapp that lets Hack for LA convert contributors' Google documents into Markdown that Hack for LA then uses as website content.  Hack for LA's site uses Jekyll, a library which converts the Markdown into HTML.  Contributors must be familiar with Google Docs, but are not required to know markdown.  For a complete list of the supported Google Doc features, see xxxxx.

The web application allows user to:
- convert one Google document
- convert all Google documents in a specific Google folder
- manage documents in the draft, in review, and production stages of development

The web app allows admins to manage user access to the web app.

The web application provides APIs for the Hack for LA website to use information to view, filter, and display the content.