import path from "path";
import { convertGdocs } from "../src/part1";
import { config } from "dotenv";
import { getPluginOptions } from "../src/part1-misc";

const envPath = path.resolve(process.cwd(), ".env");
console.log("debug process.cwd()", process.cwd());
config({ path: envPath }); // specifies the path to your .env file
if (process.env.ENV_PATH) {
  config({ path: process.env.ENV_PATH });
} else {
  process.env.ENV_PATH = envPath;
}

const options = getPluginOptions({
  folderId: process.env.WEBSITE_GDRIVE_ROOT_ID,
  root: process.env.WEBSITE_LOCAL_ROOT,
  suffix: process.env.WEBSITE_SUFFIX,
  saveGdoc: false,
  saveMarkdownToFile: true,
});
// default options saveGdoc is false, saveMarkdownToFile is true
convertGdocs(options);
