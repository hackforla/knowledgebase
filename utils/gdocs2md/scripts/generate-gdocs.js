import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), "scripts/.env") });

const folderId = process.env.GDRIVE_ROOT_FOLDER_ID;
const root = process.env.LOCAL_ROOT_FOLDER;
const suffix = process.env.SUFFIX || "-gdocs";
const pluginOptions = {
  folder: folderId,
  target: path.join(root, "gdocs-json"),
  suffix: suffix,
  extension: "json",
};

jsonifyDocs(pluginOptions);
