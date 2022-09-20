import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env.test.local") });
const folderId = process.env.TEST_GDRIVE_ROOT_ID;
const root = process.env.TEST_LOCAL_GDOC_JSON_ROOT;
const suffix = process.env.TEST_SUFFIX;
const pluginOptions = {
  folder: folderId,
  target: path.join(root, "gdoc-json"),
  suffix: suffix,
  extension: "json",
  savejson: "false",
  savemarkdown: "true",
};

jsonifyDocs(pluginOptions);
