# Terminology
- Asset: content accessible through a URL

# Overview
The Knowledgebase server interacts with a Google Doc to Mark Down Server, a People Depot Server, and a HackForLA Website Server.  Knowledgebase can work without these servers - the functionality these servers provide will not be available, but everything else will work.

The Knowledgebase server
- maintains and categorize information about 
- track status of assets
- generates markdown from assets that are Google docs.  This requires a Google Doc to Markdown server.
- uses generated markdown for content for a HackForLA Website Server.  
- users, practice areas, and technologies can be replicated from a People Depot server, where People Depot would be the source of truth.

# Servers
- Knowledgebase app is a Django app that connects to a PostGres database.  

Knowledgebase can also interact with
- HackForLA website
  - technologies: Docker, Jekyll
- PeopleDepot
  - technologies:  Docker, Python, Django, PostgreSQL, mkdocs, Amazon Cognito
  - [People Depot Docs](https://hackforla.github.io/peopledepot/)
  - [setting up a development environment](https://hackforla.github.io/peopledepot/contributing/dev_environment/)
  - [code](https://github.com/hackforla/peopledepot)
- Google Doc to Markdown Server service: TypeScript and Express
  - technologies: Typescript, Express, Google API
  - [development setup](https://github.com/hackforla/gdoc-converter/blob/main/CONTRIBUTING.md)

