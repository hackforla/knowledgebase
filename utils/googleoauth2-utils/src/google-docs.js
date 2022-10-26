const { google } = require("googleapis");
const GoogleOAuth2 = require("google-oauth2-env-vars");
const { ENV_TOKEN_VAR } = require("./constants");
const { GoogleDocumentObj } = require("./google-document");
const { fetchFoldersAndFilesInFolder } = require("./google-drive");

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

async function fetchGoogleDocObjs(options) {
  const gdocsProperties = await fetchFoldersAndFilesInFolder(options);
  const links = gdocsProperties.reduce(
    (acc, properties) => ({ ...acc, [properties.id]: properties.slug }),
    {}
  );

  const gdocs = await Promise.all(
    gdocsProperties.map(async (gdocProperties) => {
      const document = await fetchGoogleDocJson(gdocProperties.id);
      const gdoc = new GoogleDocumentObj({
        document,
        properties: gdocProperties,
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
