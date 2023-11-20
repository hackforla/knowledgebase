Tasks

+++ Required for BOP MVP
# Issues to Create
Rename
- [ ] Rename Gdoc to AssetGroup

API
- [ ] Create Topic Area, including API, but not many to many
- [ ] Make API schema dynamic
- [ ] Create Python script to dynamically create table and API, using Assets
- [ ] Add APIs for Practice Area, Tool, Status / Phase, Program Area, Tool

Assets
- [ ] Create Asset table - move URL to asset table
- [ ] Create One to Many for Asset to AssetGroup
- [ ] Add Primary Technology/Tool for Asset Group? Asset?
- [ ] Create Asset Type table
- [ ] Create One to Many for Assets to Asset Type

Many to Many
- [ ] Modify Many to Many for Practice Area
- [ ] Create Python script to dynamically add Many to Many
- [ ] Modify all Many to Manys
- [ ] Change Many to Many for PracticeArea
- [ ] Create script to make this dynamic
- [ ] Change all Many to Manys

Data
- [ ] Populate data for PracticeArea, either from local file or URL (see https://stackoverflow.com/questions/2921847/what-do-double-star-asterisk-and-star-asterisk-mean-in-a-function-call/2921893#2921893)
- [ ] Populate data for all query criteria table
- [ ] Populate initial data for Assets
- [ ] Populate Users (requires token)
# BOP MVP
- [ ] Misc
  - [ ] Change port to use DJANGO_PORT in start-dev.sh and start-docker.sh rather than passing
  - [ ] Replace export with read from .env file
  - [ ] Seed data
    - [ ] Use kb_data.py for populating data on log in
    - [ ] Do it in dynamic way from json using https://stackoverflow.com/questions/2921847/what-do-double-star-asterisk-and-star-asterisk-mean-in-a-function-call/2921893#2921893
- [ ] Dev documentation
  - [ ] Resources page, include link to spreadsheet
- [ ] Populate Data - see See https://github.com/hackforla/knowledgebase/wiki/Technical:-Design-for-Django-Amin#populate-data-from-people-depot
  - [ ] Non-sensitve People Depot Data w/script
        - [ ] Copy seed data scripts from KB/data/migrations
  - [ ] Non-sensitve People Depot Data w/APIs
        - [ ] Create scripts to populate the data using APIs. 
  - [ ] Sensitive (user) Data w/APIs
      **PEOPLE DEPOT**
      - [ ] Create users api if none
      - [ ] Secure so that it requires an admin
      **GMAIL**
      - [ ] Create peopledepot@gmail.com account that uses an app with a non-expiring password
      **KB**
      - [ ] Log into KB using that email address
      - [ ] Get token.  See https://stackoverflow.com/questions/64991155/how-do-i-get-a-token-from-django-allauth-socialaccount.
      - [ ] Assign peopledepot@gmail.com as admin
      - [ ] Create variable for token
      - [ ] Script:
            - get data by calling users api with token
            - loop through data to populate KB
      
  - [ ] Non People Depot Data
        - [ ] Create scripts to populate non-people depot tabes
- [ ] Authentication
  - [ ] Implement single sign on for Django Admin using Django AllAuth.  
  - [ ] Write article on how to implement allauth
  - [ ] Check where logout goes - should go to admin page
  - [ ] Figure out how to implement admin to be the same
- [ ] Authorization
  - [ ] Create Admin guide which explains how to add roles and what they do.  Use existing proposal as draft.  Needs to be modified to take approver into account
- [ ] Populate Data - see See https://github.com/hackforla/knowledgebase/wiki/Technical:-Design-for-Django-Amin#populate-data-from-people-depot
  - [ ] People Depot Data
      - **PEOPLE DEPOT**
        - [ ] Create necessary scripts in People Depot to populate the data
        - [ ] Secure user data
        - [ ] Add API to get token
      - **KNOWLEDGEBASE**
        - [ ] Create scripts to populate the data using APIs.  For user, get token
  - [ ] Non People Depot Data
    - [ ] Create scripts to populate non-people depot tabes
- [ ] Write up strategy to make PD integration configurable, even after application implemented
- [ ] Rename gdoc to asset group
- [ ] Add BOP topic area (one to many) table and field 
- [ ] Add primary technology as a one to many
- [ ] Add Asset Type (one to many) table and field (google spreadsheet, HTML, PDF, etc)
- [ ] Improve UI for all one to many using this article https://stackoverflow.com/questions/70709775/how-to-hide-specific-field-by-user-group-on-a-django-admin
- [ ] Populate KB tables with preset values on startup
  - [ ] Tools (frameworks)
  - [ ] Status
- [ ] During install, populate tables from PD
  - See spreadsheet for values
- [ ] Decide on strategy for syncing PD and KB data and implement - possibly WebHooks or queues.  
  - [ ] Decide on strategy.  Must take into account that KB app could potentially be down
  - [ ] Implement
- [ ] Create PD user when signing up first time through 
  - [ ] Decide on strategy.  Consider AWS Lambda triggers or queues  
- [ ] Change documentation from user roles to user groups
- [ ] Hide google id (and any future generation screens) for role catalog-maintain and catalog-view
  - See https://stackoverflow.com/questions/70709775/how-to-hide-specific-field-by-user-group-on-a-django-admin
  - [ ] Add catalog-maintain and catalog-view to Admin guide

  
# People Depot Dependencies

NEXT WEEK
- [ ] Review bugs and add bugs as necessary in peopledepot (security for sign up so needs approval, three roles, archive)
- [ ] Create tables needed by KB
  - [ ] Consider more automated generation of tables
- [ ] Populate seed data required by KB
- [ ] PeopleDepot agenda
  - [ ] Functional security document
  - [ ] Archive vs delete

# Generate Web pages from markdown

- [ ] Figure out final requirements (especially work flow and when file is generated) and UI and create issues
- [ ] Server script to generate new html file when a file changes.  See [proposal for file change detection](./proposal-file-change.md)
- [ ] Add parameters to script for generating and reverify scripts
- [ ] Verify generation of Reminders
- [ ] Figure out if generate-signature.js is needed


LATER

- [ ] Add parameters to script and reverify scripts
- [ ] Verify reminders
- [ ] Add parameters for output dir to generate-markdown-files.sh and generate-markdown-to-github.sh
- [ ] ++ Auto generate provider link
- [ ] Make default svg on frontmatter a constant env variable
- [ ] +++ DOC: Env vars
- [ ] DOC: Check documentation for service account
- [ ] +++ DOC: How to test (check)
- [ ] +++ Verify output for Slack reminders
- [ ] +++ DOC: Front matter
- [ ] Add crosslinks test (maybe)
- [ ] Change markdown and elements to use slug for filename
- [ ] +++ DOC: Generate certificate and token
- [ ] Move scripts
- [ ] Separate into separate script
- [ ] Add options (e.g, -skipdiv true) to scripts
- [ ] Add option to indicate where to get docs from (file or Google Drive)
- [ ] Test for getting data from KB
- [ ] Test for github
- [ ] Test for google drive
- [ ] +++ Incubator

- [ ] +++ Create Flask application to generate all files
- [ ] DOC: parameters
- [ ] +++ Dir structure
- [ ] +++ AUTH: Change auth so authorized from browser and variables cached
- [ ] +++ Add document style to template
- [ ] +++ ?? Remove document style from template
- [ ] ?? Style using hfla css
- [ ] +++ ?? Autogenerate image name - if svg exists use it, else configured default
- [ ] Document scripts


PHASE 2
- [ ] +++ Auto renew token

- [ ] Custom frontmatter from doc?



- [ ] Try getting data from knowledgebase database
- [ ] Provide option to ignore specific html styling
- [ ] Run tests
- [ ] Have generating file be automatic for tests
- [ ] Switch from snapshot to file for tests
- [ ] Create/test option to not lookup Django
- [ ] ++ Look at tests - why exception not caught?
- [ ] Look at code for writing google doc to json

- [ ] Add option for debugModifyContent to modify content??
- [ ] Add param to generate scripts for matchpattern

- [ ] ++ Document all js functions
- [ ] Figure out gdoc2mdv2 executable
- [ ] Auto generate contributing section

## +++ DOCUMENTATION \_\*\*

- [x] (obsoleted) Explain linkDir.sh
- [ ] History of fork
- [ ] Copy and customize extensive documentation on package
- [ ] savejson and saveMarkdownToFile parameters

## IMAGES \_\*\*

## +++ DOCKER \_\*\*

- [ ] Get to work locally
- [ ] Prod env variables
- [ ] Prod secrets
- [x] **_ +++ TEST _**
  - [ ] Change test-generate-object-from-google-drive to use actual and expected
    - [ ] Create script to generate object (element)
    - [ ] Use the generated script in test
  - [ ] Change tests to be unit based so each step is tested separately
  - [ ] Download google docs
  - [ ] Change test packages to async and troubleshoot async related warning
  - [ ] Change object test to have a before/after
  - [ ] Add test that starts with downloaded json files

## +++ TOKEN \_\*\*

- [ ] Improve error message if token not set up
- [ ] Don't prompt for certificate if already exists
- [x] **_ FRONT MATTER _**
  - [ ] Autogenerate contributors, with flag

## CREATE NPMJS PACKAGE \_\*\*

- [ ] Token + fetch google docs
- [ ] gdocs2md
- [ ] jekyllify

## MAKE CONFIGURABLE \_\*\*

- [ ] Configure individual elements obj => md
- [ ] Add elements obj => md
- [ ] Configure individual JSON => obj
- [ ] Template for front matter

## FILTER CRITERIA \_\*\*

- [ ] Implement filter methods

## MISC \_\*\*

- [x] +++ Center
  - [x] +++ Make a div
  - [ ] Change to a style
- [ ] Fix two documents that fail test due to incorrect sample
- [ ] Quote block
- [ ] Code block
- [ ] Get rid of Reporter
- [ ] Test out if links can be different than filename?
- [ ] Add hook to automatically generate new markdown and TOC when a file is added, deleted,modified

## +++ WRITE TO GITHUB \_\*\*

- [ ] Identify GitHub, docs mapping setting

## REFACTOR \_\*\*

- [ ] Refactor downloading embedded image
  - [ ] jpg?
- [ ] Rename fetch functions
- [ ] Extract functions that are long
  - [ ] Combine jekyllUtils into other module
- [ ] Rename objects with jekyll in the name
- [ ] Move LOCAL_JSON variable to a constant which is appended with root
- [ ] Look for hard coded strings, especially where root and other dirs defined

- [ ] ?? Change to functional rather than object based for process procedures
