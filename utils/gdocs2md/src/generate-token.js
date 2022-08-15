#! /usr/bin/env node
/* eslint-disable no-console */

const GoogleOAuth2 = require("google-oauth2-env-vars");

async function generateToken(privs, apis) {
  console.log("generating");
  const googleOAuth2 = new GoogleOAuth2({
    scope: privs || [
      "https://www.googleapis.com/auth/drive",
      // "https://www.googleapis.com/auth/documents.readonly",
      // "https://www.googleapis.com/auth/drive.metadata.readonly",
    ],
    token: "GOOGLE_DOCS_TOKEN",
    apis: apis || [("docs.googleapis.com", "drive.googleapis.com")],
  });
  console.log("end generating");

  await googleOAuth2.generateEnvVars();

  console.log("");
  console.log("Enjoy `gatsby-source-gdocs2md` plugin");

  process.exit();
}

generateToken();
