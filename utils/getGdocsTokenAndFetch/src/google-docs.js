const { google } = require("googleapis");
const GoogleOAuth2 = require("google-oauth2-env-vars");
const { ENV_TOKEN_VAR } = require("./constants");
const { GoogleDocumentObj } = require("./google-document");
const { fetchFilesAndFoldersInParent } = require("./google-drive");

async function fetchGDocById(id) {
  const googleOAuth2 = new GoogleOAuth2({
    token: ENV_TOKEN_VAR,
  });
  const auth = await googleOAuth2.getAuth();

  const res = await google.docs({ version: "v1", auth }).documents.get({
    documentId: id,
  });

  if (!res.data) {
    throw new Error("Empty Data");
  }

  return res.data;
}

/** @param {import('../..').Options} options */
async function fetchGoogleDocumentsObj(options) {
  const documentsProperties = await fetchFilesAndFoldersInParent(options);
  const links = documentsProperties.reduce(
    (acc, properties) => ({ ...acc, [properties.id]: properties.slug }),
    {}
  );

  const googleDocuments = await Promise.all(
    documentsProperties.map(async (properties) => {
      const document = await fetchGDocById(properties.id);
      const googleDocument = new GoogleDocumentObj({
        document,
        properties,
        options,
        links,
      });
      return googleDocument;
    })
  );

  return googleDocuments;
}

module.exports = {
  fetchGoogleDocumentsObj,
};
