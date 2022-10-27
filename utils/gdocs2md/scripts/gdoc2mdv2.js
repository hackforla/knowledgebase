import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
const envPath = path.resolve(process.cwd(), ".env.dev.local");
import { getParamValues } from "../src/jekyllUtils.js";
config({ path: envPath });
const paramValues = getParamValues();
console.log("p", paramValues);
const matchPattern = paramValues["matchpattern"];
const saveGdoc = paramValues["savejson"]?.toLowerCase() || "true" === "true";
paramValues["savemarkdown"]?.toLowerCase() || "false" !== "false";
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
  saveGdoc,
  saveMarkdown,
};

jekyllifyDocs(pluginOptions);
