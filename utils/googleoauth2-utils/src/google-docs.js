const { google } = require("googleapis");
const { GoogleDocumentObj } = require("./google-document");
const { fetchFromTopFolder } = require("./google-drive");
const { getAuth } = require("./google-auth");

async function getGoogleDocsApi() {
  // const googleOAuth2 = new GoogleOAuth2({
  //   token: ENV_TOKEN_VAR,
  // });
  const auth = await getAuth();
  return google.docs({ version: "v1", auth });
}

async function fetchGoogleDocJson(id) {
  const googleDocsApi = await getGoogleDocsApi();
  const res = await googleDocsApi.documents.get({
    documentId: id,
  });

  if (!res.data) {
    throw new Error("Empty Data");
  }

  return res.data;
}

async function fetchBasicGdocsFromDrive({ folder, debug }) {
  const gdocsProperties = await fetchFromTopFolder({ folder, debug });
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
        links,
      });
      return gdoc;
    })
  );

  return gdocs;
}

module.exports = {
  fetchBasicGdocsFromDrive,
};
