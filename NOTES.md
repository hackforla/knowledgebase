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