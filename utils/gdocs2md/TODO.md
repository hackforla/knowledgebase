Tasks

+++ Required for MVP

# PENDING

- [ ] **_ +++ NEXT _**
  - [ ] Restore contributors in json
  - [ ] Document all js functions
  - [ ] Refactor from start to finish
  - [ ] +++ Incubator
  - [ ] +++ Write to github, provide option to write to file
  - [ ] +++ Verify Reminders
  - [ ] +++ Make default svg on frontmatter a constant env variable
  - [ ] +++ Check if anything missing from frontmatter in schema
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
  - [ ] savejson and savemarkdown parameters
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
  - [ ] Autogenerate provider-link
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
