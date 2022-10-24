const { google } = require("googleapis");
const GoogleOAuth2 = require("google-oauth2-env-vars");
const { ENV_TOKEN_VAR } = require("./constants");
const { GoogleDocumentObj } = require("./google-document");
const { fetchFilesAndFoldersInParent } = require("./google-drive");

async function fetchGoogleDocJson(id) {
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
async function fetchGoogleDocObjs(options) {
  const documentsProperties = await fetchFilesAndFoldersInParent(options);
  const links = documentsProperties.reduce(
    (acc, properties) => ({ ...acc, [properties.id]: properties.slug }),
    {}
  );

  const gdocs = await Promise.all(
    documentsProperties.map(async (properties) => {
      const document = await fetchGoogleDocJson(properties.id);
      const gdoc = new GoogleDocumentObj({
        document,
        properties,
        options,
        links,
      });
      return gdoc;
    })
  );

  return gdocs;
}

module.exports = {
  fetchGoogleDocObjs,
};
