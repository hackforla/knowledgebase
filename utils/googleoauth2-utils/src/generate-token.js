#! /usr/bin/env node
/* eslint-disable no-console */

const GoogleOAuth2 = require("google-oauth2-env-vars");
const { ENV_TOKEN_VAR } = require("./constants");

async function generateToken(privs, apis) {
  const googleOAuth2 = new GoogleOAuth2({
    scope: privs || [
      // "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/documents.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
    token: ENV_TOKEN_VAR,
    apis: apis || [("docs.googleapis.com", "drive.googleapis.com")],
  });

  await googleOAuth2.generateEnvVars();

  console.log("");
  console.log("Enjoy `gatsby-source-gdocs2md` plugin");

  process.exit();
}

generateToken();
