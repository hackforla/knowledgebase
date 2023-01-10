Tasks

+++ Required for MVP

# PENDING

- [ ] **_ +++ NEXT _**

  - [ ] +++ Write to github, provide option to write to file Mon

    - [x] +++ Update file
    - [x] +++ Put in real file
    - [x] +++ Clean up console.log
    - [x] +++ Commit
    - [x] ++ Add more parameters to writeToGitHub, including comment
    - [x] ++ Make message an env variable
    - [x] +++ Option to save to drive and/or github

    - [ ] +++ Put different places depending on status
      - [x] Get one file to work
      - [x] Try all files (one should go to dev)
    - [ ] +++ Regenerate results for doing comparison actual results
    - [ ] ++ Add debug option for adding to content
    - [ ] +++ Change filename based on slug
    - [ ] +++ Create Flask application to generate all files
    - [ ] ++ Create google docs plug in to populate table
    - [ ] Refactor
      - [ ] Distinguish gdocPlain vs gdocWithElelments
      - [ ] Put all write functionality together
      - [ ] Create writeMarkdownToFile and writeJsonToFile to call writeContent or writeToFile
      - [ ] Consider taking functions from utils and moving to ElementsOfGoogleDocument
      - [ ] Look at level of abstraction in process and next level down

  - [ ] +++ Change auth so authorized from browser and variables cached
  - [x] +++ Show other tables
  - [x] ++ Figure out why .env.EXAMPLE gets updated
  - [ ] ++ Figure out .catch Tue
  - [ ] +++ Add custom icon to json_data Tue
  - [ ] +++ Make activity boolean
  - [ ] +++ Make phase a one to many
  - [ ] ++ Console.log whether commit happened
  - [ ] ++ Add option for debugModifyContent to modify content
  - [ ] ++ Add param to generate scripts for matchPattern, debugModifyContent
  - [ ] +++ Incubator
  - [ ] +++ Auto generate provider link Tue
  - [ ] +++ Verify Reminders Tue
  - [ ] +++ Make default svg on frontmatter a constant env variable Ti
  - [ ] +++ Check if anything missing from frontmatter in schema
  - [ ] ++ Add custom formatting to test. Mock
  - [ ] ++ Document all js functions
  - [ ] ++ Refactor from start to finish
  - [ ] Look at a markdown file for how contributing section works
  - [ ] Figure out gdoc2mdv2 executable
  - [ ] Auto generate contributing section

- [ ] **_ +++ DOCUMENTATION _**
  - [x] (obsoleted) Explain linkDir.sh
  - [ ] History of fork
  - [ ] Copy and customize extensive documentation on package
  - [ ] +++ Generate certificate and token
  - [ ] +++ Env vars
  - [ ] +++ How to test (check)
  - [ ] +++ Front matter
  - [ ] +++ Dir structure
  - [ ] savejson and saveMarkdownToFile parameters
- [ ] **_ IMAGES _**
- [ ] **_ +++ DOCKER _** - [ ] Get to work locally
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
- [x] **_ +++ TEST TOC (ALYSSA'S PULL REQUEST) _**
  - [x] Test out TOC.html
- [ ] **_ +++ TOKEN _**
  - [ ] +++ Auto renew token
  - [ ] Improve error message if token not set up
  - [ ] Don't prompt for certificate if already exists
- [x] **_ FRONT MATTER _**
  - [ ] +++ Autogenerate provider-link
  - [ ] Autogenerate contributors, with flag
- [ ] **_ CREATE NPMJS PACKAGE _**
  - [ ] Token + fetch google docs
  - [ ] gdocs2md
  - [ ] jekyllify
- [ ] **_ MAKE CONFIGURABLE _**
  - [ ] Configure individual elements obj => md
  - [ ] Add elements obj => md
  - [ ] Configure individual JSON => obj
  - [ ] Template for front matter
- [ ] **_ FILTER CRITERIA _**
  - [ ] Implement filter methods
- [ ] **_ MISC _**

  - [x] +++ Propose and implement dir structure
  - [ ] +++ Verify output for Slack reminders
  - [ ] ?? +++ Add document style to template
  - [ ] ?? +++ Remove document style from template
  - [ ] ?? Style using hfla css
  - [ ] ?? +++ Autogenerate image name - if svg exists use it, else configured default

  - [x] +++ Center
    - [x] +++ Make a div
    - [ ] Change to a style
  - [ ] Fix two documents that fail test due to incorrect sample
  - [ ] Quote block
  - [ ] Code block
  - [ ] Get rid of Reporter
  - [ ] Test out if links can be different than filename?
  - [ ] Add hook to automatically generate new markdown and TOC when a file is added, deleted,modified

- [ ] **_ +++ WRITE TO GITHUB _**

  - [ ] Identify GitHub, docs mapping setting

- [ ] **_ REFACTOR _**

  - [ ] Refactor downloading embedded image
    - [ ] jpg?
  - [ ] Rename fetch functions
  - [ ] Extract functions that are long
    - [ ] Combine jekyllUtils into other module
  - [ ] Rename objects with jekyll in the name
  - [ ] Move LOCAL_JSON variable to a constant which is appended with root
  - [ ] Look for hard coded strings, especially where root and other dirs defined

  - [ ] ?? Change to functional rather than object based for process procedures

# Completed

- [x] Misc
  - [x] Create directory with some Google doc guides
  - [x] Create node script that calls npm package to convert google docs to markdown from specified Google dir and its subdirs to specified output location
  - [x] Inspect results for Google doc guides
  - [x] Modify markdown directly for images and sections
  - [x] Inspect results again
  - [x] Fix images issue
  - [x] Create script to copy converted documents where build process would pick them up
  - [x] Manually create a TOC page for listing the guides
  - [x] Create separate directories for in progress. Add a new document and revised document to this directory.
  - [x] Manually create a TOC that shows original and in progress guides.
- [x] Config / customize
  - [x] Make gdocs output directory configurable
  - [x] Make frontmatter generation configurable
  - [x] Make frontmatter content configurable
  - [x] Add option to not download file
  - [x] Add option to link to image.source
  - [x] Customize name of classes for "center" and "right-align"
        Tests
  - [x] Generate JSON of Google Docs
  - [x] Create docs of different types
  - [x] Generate JSON
  - [x] Create a jekyllifyDoc to jekllify a single doc
  - [x] Copy existing tests and modify
  - +++ [x] Generate markdown as part of tests
- [x] **_ FRONT MATTER _**
  - [x] Automated
  - [x] Custom
  - [x] Custom overwrites automated
  - [x] Automated overwrites default
- [ ] **_ +++ IMAGES _**
  - [x] +++ Store image locally (otherwise, permission issue)
  - [x] +++ Set size
  - [x] +++ Change link to point to the image
