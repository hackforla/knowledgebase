import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env.test.local") });
const folderId = process.env.GDRIVE_FOLDER_ID;
const root = process.env.LOCAL_ROOT_FOLDER;
const suffix = process.env.SUFFIX;
const pluginOptions = {
  folder: folderId,
  target: path.join(root, "gdoc-json"),
  suffix: suffix,
  extension: "json",
  savejson: "true",
  savemarkdown: "false",
};

jsonifyDocs(pluginOptions);
