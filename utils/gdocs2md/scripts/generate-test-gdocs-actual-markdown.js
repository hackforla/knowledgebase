import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env.test.local") });
const folderId = process.env.TEST_GDRIVE_ROOT_ID;
const root = process.env.TEST_LOCAL_ROOT;
const suffix = process.env.TEST_SUFFIX;
console.log("root", root, "suffix", suffix);
const pluginOptions = {
  folder: folderId,
  target: path.join(
    root,
    "actual-results/markdowns-generated-from-google-drive"
  ),
  suffix: suffix,
  extension: "md",
  saveJson: false,
  saveMarkdown: true,
};

jekyllifyDocs(pluginOptions);
