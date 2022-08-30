import path from "path";
import { jsonifyDocs } from "../src/jekyllUtils.js";
// const pkg = require("lodash");
// import { merge as _merge } from "lodash";
const root =
  "/Users/ethanadmin/projects/hfla-googledocs-converter/hfla-utils/utils/gdocs2md/src";
const pluginOptions = {
  folder: "1R2fYUh2EwbLot9Akm311Osxpl7WbvEvM",
  target: path.join(root, "__test__"),
  imagesTarget: path.join(root, "__test__/assets/images"),
};

jsonifyDocs(pluginOptions);

const fake = async () => {};

export default fake;
