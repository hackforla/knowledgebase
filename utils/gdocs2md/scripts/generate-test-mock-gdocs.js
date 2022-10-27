import path from "path";
import { jekyllifyDocs } from "../src/jekyllUtils.js";
import { config } from "dotenv";
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env.test.local") });
const folderId = process.env.TEST_GDRIVE_ROOT_ID;
const root = process.env.TEST_LOCAL_ROOT_DIR;
const suffix = process.env.TEST_SUFFIX;
const pluginOptions = {
  folder: folderId,
  targetTestRootDi: path.join(root, "mock/gdoc-objs"),
  suffix: suffix,
  extension: "json",
  saveGdoc: true,
  saveMarkdown: false,
};

jekyllifyDocs(pluginOptions);
