import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
// const pkg = require("lodash");
// import { merge as _merge } from "lodash";
const folderId = process.env("GDRIVE_TEST_FOLDER_ID");
const root = process.env("LOCAL_TEST_FOLDER");
const pluginOptions = {
  folder: folderId,
  target: path.join(root, "gdocs-json"),
  // imagesTarget: path.join(root, "assets/images"),
  suffix: "x-gdocs",
  extension: "json",
};

jsonifyDocs(pluginOptions);

const fake = async () => {};

export default fake;
