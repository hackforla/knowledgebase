const { google } = require("googleapis");
const { ENV_TOKEN_VAR } = require("./constants");
const fs = require("fs");
const GoogleOAuth2 = require("google-oauth2-env-vars");
const privatekey = require("./privatekey.json");

const refreshExpiredTokenVar = async () => {
  console.log("refreshing token");
  let oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );
  console.log(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.WEBSITE_GDRIVE_ROOT_ID
  );
  const currentToken = JSON.parse(process.env[ENV_TOKEN_VAR]);
  const expiry_date = currentToken.expiry_date;
  console.log(expiry_date, Date.now());
  if (expiry_date < Date.now()) {
    throw new Error(`Token expired ${new Date(expiry_date)}`);
  }
  const refreshToken = currentToken.refresh_token;
  console.log("token refreshed a", currentToken.expiry_date);
  oauth2Client.credentials.refresh_token = refreshToken;
  await getRefreshToken(oauth2Client);
  process.env[ENV_TOKEN_VAR] = JSON.stringify(oauth2Client.credentials);
  replaceEnvVar(ENV_TOKEN_VAR, process.env[ENV_TOKEN_VAR]);
  console.log("new expire date", oauth2Client.credentials.expiry_date);
};

const getAuth = async () => {
  await refreshExpiredTokenVar();
  const googleOAuth2 = new GoogleOAuth2({
    token: ENV_TOKEN_VAR,
  });
  const auth = await googleOAuth2.getAuth();
  return auth;
};

const getAuth2 = async () => {
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  //authenticate request
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
  });
};

module.exports = { getAuth };
async function getRefreshToken(oauth2Client) {
  return await new Promise((resolve, reject) => {
    oauth2Client.refreshAccessToken((error, tokens) => {
      if (error) {
        throw error;
      }
      resolve(tokens);
    });
  });
}

function replaceEnvVar(variable, value) {
  if (fs.existsSync(process.env.ENV_PATH)) {
    const regExpression = new RegExp(`${variable}.*`, "gm");
    let envContents = fs.readFileSync(process.env.ENV_PATH, "utf8");
    envContents = envContents.replace(regExpression, `${variable}=${value}`);
    fs.writeFileSync(process.env.ENV_PATH, envContents);
  }
}
