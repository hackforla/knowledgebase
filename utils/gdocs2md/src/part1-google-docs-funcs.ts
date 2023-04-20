import { google } from "googleapis";

async function getGoogleDocsApi() {
  // const googleOAuth2 = new GoogleOAuth2({
  //   token: ENV_TOKEN_VAR,
  // });
  const auth = await getAuth();
  return google.docs({ version: "v1", auth });
}

export async function fetchGoogleDocJson(id: string) {
  const googleDocsApi = await getGoogleDocsApi();
  const res = await googleDocsApi.documents.get({
    documentId: id,
  });

  if (!res.data) {
    throw new Error("Empty Data");
  }

  return res.data;
}

module.exports = {
  fetchGoogleDocJson,
};

// return a map for each gdoc to the slug for each gdoc
