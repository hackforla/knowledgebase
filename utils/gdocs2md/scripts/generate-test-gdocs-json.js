import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), "scripts/.env") });

const folderId = process.env.GDRIVE_TEST_FOLDER_ID;
const root = process.env.LOCAL_TEST_ROOT;
const suffix = process.env.SUFFIX;
const pluginOptions = {
  folder: folderId,
  target: path.join(root, "gdocs-json"),
  suffix: suffix,
  extension: "json",
  savejson: "true",
  savemarkdown: "false",
};

jekliffyDocs(pluginOptions);
