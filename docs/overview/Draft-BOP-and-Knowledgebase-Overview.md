# BOP Project

The purpose of the BoP project is to catalog knowledge assets / documentation about development practices for organizations or open source communities, starting with Hackfor LA.

# Knowledgebase

## Cataloging
The purpose of the Knowledgebase app is to support the cataloging of BOP.  Knowledgebase app stores content assets and related data in a Postgres database.  The data is maintained through the default admin screens in Django.  

## Markdown to Google Doc
Some of the BoP assets will be Google Docs.  The app will supports the generation of web pages from Google docs to markdown which is then used to generate the web pages for the "Toolkit" website.  


# Misc
The Knowledgebase screens were reviewed to see how closely they align with the needs for BOP.  The model:
  - google id is only relevant if the content is used as source for the HackForLA website.  To support parallel development of web page generation this field will need to be included but can be hidden when deployed to production.
- Data will be initially populated from existing google sheets
- Subsequent updates and additions will be done through the Django admin page.  No APIs need to built for this.
- Viewing and querying can also be done through Django admin, depending on the complexity of the functional and usability requirements.
- Django admin security (which comes with role and group based security) will be configured based on security requirements.
- APIs will be created to support a dashboard that summarizes the asset data.
- Data maintained by People Depot will be synchronized with Knowledgebase