Tasks

+++ Required for MVP

# PENDING

## Use service account

- [x] Check privileges
- [x] Regenerate token and get existing code to work
- [x] Search for example "service account" google drive get
- [x] Search github google drive get
- [x] Change .env for new google drive id for test
- [x] subdir - print out the list
- [x] Try google drive list

## +++ NEXT \_\*\*

- [x] Try saving to github
- [x] Get script that creates mock google docs to work 
- [x] Run mock google docs script to have new mock google docs
- [x] Create test that it works
- [x] Change google drive to markdown test to start from files on google drive
THIS WEEK
- [x] Get all scripts to work
- [x] Get tests to work
  - [x] Elements test
  - [x] Options tests
- [ ] Add parameters to script and reverify scripts
- [x] Fix title issue
- [ ] Verify reminders
NEXT WEEK
- [ ] Add parameters for output dir to generate-markdown-files.sh and generate-markdown-to-github.sh
- [ ] ++ Auto generate provider link
- [ ] Make default svg on frontmatter a constant env variable
- [ ] +++ DOC: Env vars
- [ ] DOC: Check documentation for service account
- [ ] +++ DOC: How to test (check)
- [ ] +++ Verify output for Slack reminders
- [ ] +++ DOC: Front matter
- [ ] Add crosslinks test (maybe)

LATER
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
