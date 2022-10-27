import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
const envPath = path.resolve(process.cwd(), ".env.dev.local");
config({ path: envPath }); // specifies the path to your .env file
process.env.ENV_PATH = envPath;
const pluginOptions = {
  // folder: folderId,
  // targetMarkdownDir: root,
  // imagesTarget: path.join(root, "assets/images"),
  // suffix: suffix,
  // matchPattern,
  saveGdoc: false,
  saveMarkdown: true,
};

jekyllifyDocs(pluginOptions);
