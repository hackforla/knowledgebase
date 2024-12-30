- The purpose of the BoP project is to create an app to catalog knowledge assets about development practices for Code for America brigades.
- The purpose of the Knowledgebase app which is in progress is intended to supported BoP functionality.   Additionally, the app supports the generation of web pages from markdown about development practices.   The markdown is stored in the HackForLA Website repo and when generated, added to the "Toolkit" of the HackForLA website.  The web page and source markdown are also content asset which would be of interest to HackForLA and potentially other Code for America brigades.
- Since Knowledgebase is intended to support BOP, the two projects are being combined.
- MVP for Phase 1 will only support the cataloging of content described in the first bullet.  Generation of HackForLA content will be a later phase.
- Knowledgebase stores content assets and related data in a Postgres or  (for development only) MySQL database.  The data is maintained through the default admin screens in Django.  
- The Knowledgebase screens were reviewed to see how closely they align with BOP.  The following needs to be added to the Knowledgebase model:
  - gdoc (badly named) table which was intended to hold all types of content assets will be split into two tables: asset groups and assets.  Most fields will go into asset group. An asset group will have one or more assets associated with it.  Asset table will include title, asset type, and URL at a minimum.
  - google id is only relevant if the content is used as source for the HackForLA website.  To support parallel development of web page generation this field will need to be included but can be hidden when deployed to production.
  - a field is needed to indicate this is for / from the HackForLA website, which will be hidden for production.
- Data will be initially populated from existing google sheets
- Subsequent updates and additions will be done through the Django admin page.  No APIs need to built for this.
- Viewing and querying can also be done through Django admin, depending on the complexity of the functional and usability requirements.
- Django admin security (which comes with role and group based security) will be configured based on security requirements.
- APIs will be created to support a dashboard that summarizes the asset data.
- Data maintained by People Depot will be synchronized with Knowledgebase