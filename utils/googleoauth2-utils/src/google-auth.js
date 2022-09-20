const { google } = require("googleapis");
const { ENV_TOKEN_VAR } = require("./constants");
const fs = require("fs");
const GoogleOAuth2 = require("google-oauth2-env-vars");

const refreshExpiredTokenVar = async () => {
  let oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );
  const currentToken = JSON.parse(process.env[ENV_TOKEN_VAR]);
  const expiry_date = currentToken.expiry_date;
  if (expiry_date < Date.now()) {
    const refreshToken = currentToken.refresh_token;
    oauth2Client.credentials.refresh_token = refreshToken;
    const newToken = await getRefreshToken(oauth2Client);
    process.env[ENV_TOKEN_VAR] = JSON.stringify(newToken);
    replaceEnvVar(ENV_TOKEN_VAR, process.env[ENV_TOKEN_VAR]);
  }
};

const getAuth = async () => {
  await refreshExpiredTokenVar();
  const googleOAuth2 = new GoogleOAuth2({
    token: ENV_TOKEN_VAR,
  });
  const auth = await googleOAuth2.getAuth();
  return auth;
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
