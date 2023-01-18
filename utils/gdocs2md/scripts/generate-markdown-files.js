const path = require("path");
const { jekyllifyDocs } = require("../src/jekyllUtils");
const { config } = require("dotenv");
const envPath = path.resolve(process.cwd(), ".env");
console.log("debug process.cwd()", process.cwd());
config({ path: envPath }); // specifies the path to your .env file
if (process.env.ENV_PATH) {
  config({ path: process.env.ENV_PATH });
} else {
  process.env.ENV_PATH = envPath;
}

// default options saveGdoc is false, saveMarkdownToFile is true
jekyllifyDocs({});
