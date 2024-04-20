Tasks

+++ Required for BOP MVP


# BOP MVP

- [ ] https://github.com/hackforla/peopledepot/issues/149
- [ ] User synch
  - [ ] If PEOPLE_DEPOT_URL is defined in kb when user logs in, confirm PEOPLE_DEPOT URL works.  If it doesn't work, error message and prevent creation of user.  
  - [ ] Prevent creation of user in KB ifcannot create in PD
  - [ ] Manual tests
    - [ ] Sign up for account in kb.  
      - From sqlite browser
        - verify account is created in PD
        - verify account is created in BD 
        - Compare user account in PD and KB
        - compare to Cognito
      - Log in to kb using new account - verify message no authorization
      - Log in to pd using new account- verify message no authorization
      - Test API call from kb to pd
        - Verify call people depot URL indicates authenticated but not authorized
        - Set is_staff to true in PD
        - Verify call people depot urlworks
      - Document manual tests
    - [ ] Sign up for account in pd.  
      - From sqlite browser
        - verify account is created in PD
        - sign in to using KB cognito account
        - verify account is created in KB 
        - Compare user account in PD and KB
        - compare to Cognito
      - Log in to kb using new account - verify message no authorization
      - Log in to pd using new account- verify message no authorization
      - Test API call from kb to pd
        - Verify call people depot URL indicates authenticated but not authorized
        - Set is_staff to true in PD
        - Verify call people depot urlworks
      - Document manual tests
  - [ ] Implement and test updating user in kb, see gets changed in pd
  - [ ] Implement and test updating user in pd, see gets changed in kb
  - [ ] Decide on strategy on 
    - what to do if pd is down and new account is created - how to eventually resynch

- [ ] Create Asset API and tests - include all fields and 1-M, M-M
- [ ] Create Asset Group API and tests - include all fields and 1-M, M-M
- [ ] Add parent_asset and display flag to asset as a required field



```
    Assets >-< Topic Area
      -< Asset Versions - Primary, Name, Description >- Status
```    
- [ ] Change way google_id unique is defined
- [ ] Asset Group -> Asset - UI options:
  - Allow autocreation of asset group if none is selected
  - Show assets on Asset Group
  - When add another, default to the previous Asset Group?
- [ ] Issue - Populate auth app
  - [x] Populate groups
  - [ ] If people depot url is defined
    - [ ] kb.admin: all privileges for kb,view privileges for PD.  For V2, allow update of users
    - [ ] kb.maintainer: all privileges for kb, view privileges for pd
    - [ ] kb.approver: same as maintainer
    - [ ] kb.view: all view privileges for kb and pd
  - [ ] Add user organizateion
  - [ ] Modify tool to include primary

  - [ ] Documentation
    - [ ] How PD user data is populated
    - [ ] Auth when people_depot_url is defined and when not
    - [ ] Asset Group Version
    - [ ] Write article on how to implement allauth
    - [ ] Write up strategy to make PD integration configurable, even after application implemented
  - [ ] Authentication
    - [x] Implement single sign on for Django Admin using Django AllAuth.  


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
