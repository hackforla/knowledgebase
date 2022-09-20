const { ENV_TOKEN_VAR } = require("./constants");

const refreshExpiredTokenVar = async () => {
  let oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );
  const currentToken = process.env[ENV_TOKEN_VAR];
  const expiry_date = currentToken.expiry_date;
  if (expiry_date > Date.now()) {
    const refreshToken = currentToken.refresh_token;
    oauth2Client.credentials.refresh_token = refreshToken;
    const newToken = await new Promise((resolve, reject) => {
      oauth2Client.refreshAccessToken((error, tokens) => {
        if (error) {
          throw error;
        }
        resolve(tokens);
      });
    });
    process.env[ENV_TOKEN_VAR] = JSON.stringify(newToken);
  }
};

const getAuth = async () => {
  await refreshExpiredTokenVar;
  const googleOAuth2 = new GoogleOAuth2({
    token: ENV_TOKEN_VAR,
  });
  const auth = await googleOAuth2.getAuth();
  return auth;
};

module.exports = { getAuth };
