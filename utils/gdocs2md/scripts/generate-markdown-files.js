import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
import { getParamValues } from "../src/jekyllUtils.js";
const paramValues = getParamValues();
const matchPattern = paramValues["matchpattern"];
const saveJson = paramValues["savejson"]?.toLowerCase() === "true";
const saveMarkdown = paramValues["savemarkdown"]?.toLowerCase() !== "false";
const envPath = path.resolve(process.cwd(), ".env.dev.local");
config({ path: envPath });
process.env.ENV_PATH = envPath;
const folderId = process.env.WEBSITE_GDRIVE_ROOT_ID;
const root = process.env.WEBSITE_LOCAL_ROOT;
const suffix = process.env.WEBSITE_SUFFIX;
const pluginOptions = {
  folder: folderId,
  targetMarkdownDir: root,
  imagesTarget: path.join(root, "assets/images"),
  suffix: suffix,
  matchPattern,
  saveJson,
  saveMarkdown,
};

jekyllifyDocs(pluginOptions);
