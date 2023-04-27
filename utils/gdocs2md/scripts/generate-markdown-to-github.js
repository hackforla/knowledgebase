const path = require("path");
const { convertGdocs } = require("../src/convert-gdocs");
const { config } = require("dotenv");
const { getPluginOptions } = require("../src/utils");

const envPath = path.resolve(process.cwd(), ".env");
console.log("debug process.cwd()", process.cwd());
config({ path: envPath }); // specifies the path to your .env file
if (process.env.ENV_PATH) {
  config({ path: process.env.ENV_PATH });
} else {
  process.env.ENV_PATH = envPath;
}

const options = getPluginOptions({
  folderid: process.env.WEBSITE_GDRIVE_ROOT_ID,
  root: process.env.WEBSITE_LOCAL_ROOT,
  suffix: process.env.WEBSITE_SUFFIX,
  saveGdoc: false,
  saveMarkdownToFile: false,
  saveMarkdownToGitHub: true,
});
// default options saveGdoc is false, saveMarkdownToFile is true
convertGdocs(options);
