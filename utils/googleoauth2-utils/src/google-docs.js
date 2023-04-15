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

async function fetchGdocsDetails({ folder, debug }) {
  const gdocsProperties = await fetchFromTopFolder({
    folder,
    debug,
  });
  const gdocsSlugs = _getSlugs(gdocsProperties);

  const gdocs = await Promise.all(
    gdocsProperties.map(async (gdocProperties) => {
      const document = await fetchGoogleDocJson(gdocProperties.id);
      const gdoc = new GoogleDocumentObj({
        document,
        properties: gdocProperties,
        // todo: remove this
        links: gdocsSlugs,
      });
      return gdoc;
    })
  );

  return gdocs;
}

module.exports = {
  fetchGdocsDetails,
};

// return a map for each gdoc to the slug for each gdoc
function _getSlugs(gdocsProperties) {
  return gdocsProperties.reduce(
    (acc, gdoc) => ({ ...acc, [gdoc.id]: gdoc.slug }),
    {}
  );
}
