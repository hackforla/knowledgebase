Google Docs is an ideal tool for collaboratively editing and is familiar to most people.  However, it cannot easily be displayed on a Jekyll website.  The Knowledgebase Google Doc Markdown Converter will convert Google Docs to markdown and push it to a Jekyll based GitHub repository which will
automatically trigger generating HTML from the markdown and update the list of guides.  Metadata about the Google Doc will be stored in a Postgres
database which will be used both for querying the documents and for displaying the list of documents.

See [Wiki](https://github.com/hackforla/knowledgebase/wiki) for more detail.
