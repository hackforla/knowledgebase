Tasks

+++ Required for BOP MVP


# BOP MVP
- [ ] Misc
  - [ ] Replace export with read from .env file
  - [ ] Populate assets from spreadsheet

- [ ] Bugs

  - [ ] New
  - [ ] Review below for bugs

- [ ] Populate auth app
  - [x] Populate groups
  - [ ] kb.admin: add all view groups and all non-view privileges for kb
  - [ ] kb.maintainer: add all privileges for kb, view privileges for pd
  - [ ] kb.approver: same as maintainer
  - [ ] kb.view: all view privileges for kb and pd

- [ ] Documentation
  - [ ] Create Admin guide which explains how to add roles and what they do.  Use existing proposal as draft.  Needs to be modified to take approver into account
  - [ ] Change documentation from user roles to user groups
  - [ ] Write article on how to implement allauth

- [ ] Authentication
  - [x] Implement single sign on for Django Admin using Django AllAuth.  

- [ ] Populate Data - see See https://github.com/hackforla/knowledgebase/wiki/- [ ] Write up strategy to make PD integration configurable, even after application implemented
- [ ] Add organization and user organizat
- [ ] Add BOP topic area (one to many) table and field 
- [ ] Add primary technology as a one to many
- [ ] Add Asset Type (one to many) table and field (google spreadsheet, HTML, PDF, etc)
- [ ] Improve UI for all one to many using this article https://stackoverflow.com/questions/70709775/how-to-hide-specific-field-by-user-group-on-a-django-admin

- [ ] Decide on strategy for syncing PD and KB data and implement - possibly WebHooks or queues.  
  - [ ] Decide on strategy.  Must take into account that KB app could potentially be down
  - [ ] Implement
- [ ] Create PD user when signing up first time through 
  - [ ] Decide on strategy.  Consider AWS Lambda triggers or queues  


  
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
