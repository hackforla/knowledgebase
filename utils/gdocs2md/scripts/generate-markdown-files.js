import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
import { getParamValues } from "../src/jekyllUtils.js";
const paramValues = getParamValues();
const matchPattern = paramValues["matchpattern"];
const saveJson = paramValues["savejson"] === "true";
const saveMarkdown = paramValues["savemarkdown"]?.toLowerCase() !== "false";
const envPath = path.resolve(process.cwd(), ".env.dev.local");
config({ path: envPath });
process.env.ENV_PATH = envPath;
const folderId = process.env.GDRIVE_ROOT_FOLDER_ID;
const root = process.env.LOCAL_ROOT_FOLDER;
const suffix = process.env.SUFFIX || "-gdoc";
const pluginOptions = {
  folder: folderId,
  target: root,
  imagesTarget: path.join(root, "assets/images"),
  suffix: suffix,
  matchPattern,
  saveJson,
  saveMarkdown,
};

jekyllifyDocs(pluginOptions);
