Tasks

+++ Required for MVP

# PENDING

## +++ NEXT \_\*\*

- [ ] Switch from snapshot to file
- [ ] - Create option to not lookup Django
- [ ] - Add debug option for adding to content
- [ ] +++ Create Flask application to generate all files
- [ ] - Create google docs plug in to populate table
- [ ] ++ Look at tests - why exception not caught?
- [ ] Refactor

  - [ ] Distinguish gdocPlain vs gdocWithElelments
  - [ ] Put all write functionality together
  - [ ] Create writeMarkdownToFile and writeJsonToFile to call writeContent or writeToFile
  - [ ] Consider taking functions from utils and moving to ElementsOfGoogleDocument
  - [ ] Look at level of abstraction in process and next level down

- [ ] +++ Change auth so authorized from browser and variables cached
- [ ] +++ Add custom icon to json_data ???
- [ ] +++ Make activity boolean
- [ ] +++ Make phase a one to many
- [ ] - Add option for debugModifyContent to modify content??
- [ ] - Add param to generate scripts for matchPattern, debugModifyContent??
- [ ] +++ Incubator
- [ ] ++ Auto generate provider link
- [ ] +++ Verify Reminders ??
- [ ] +++ Make default svg on frontmatter a constant env variable
- [ ] +++ Check if anything missing from frontmatter in schema
- [ ] +++ Add custom formatting to test. Mock
- [ ] ++ Document all js functions
- [ ] - Refactor from start to finish
- [ ] Look at a markdown file for how contributing section works
- [ ] Figure out gdoc2mdv2 executable
- [ ] Auto generate contributing section

## +++ DOCUMENTATION \_\*\*

- [x] (obsoleted) Explain linkDir.sh
- [ ] History of fork
- [ ] Copy and customize extensive documentation on package
- [ ] +++ Generate certificate and token
- [ ] +++ Env vars
- [ ] +++ How to test (check)
- [ ] +++ Front matter
- [ ] +++ Dir structure
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

- [ ] +++ Auto renew token
- [ ] Improve error message if token not set up
- [ ] Don't prompt for certificate if already exists
- [x] **_ FRONT MATTER _**
  - [ ] +++ Autogenerate provider-link
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

- [ ] +++ Verify output for Slack reminders
- [ ] +++ Add document style to template
- [ ] +++ ?? Remove document style from template
- [ ] ?? Style using hfla css
- [ ] +++ ?? Autogenerate image name - if svg exists use it, else configured default

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
