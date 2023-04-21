const path = require("path");
const { convertGdocs } = require("../src/convert-gdocs");
const { config } = require("dotenv");
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath }); // specifies the path to your .env file
const pkg = require("../src/__tests__/testConstants.js");
const { testMarkdownPluginOptions } = pkg;
if (process.env.ENV_PATH) {
  config({ path: process.env.ENV_PATH });
} else {
  process.env.ENV_PATH = envPath;
}
convertGdocs(testMarkdownPluginOptions);
