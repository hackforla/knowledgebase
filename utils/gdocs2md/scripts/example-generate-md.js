import path from "path";
import { jekyllifyDocs } from "..//src/jekyllUtils.js";
import { config } from "dotenv";
config();

const folderId = process.env.GDRIVE_ROOT_FOLDER_ID;
const root = process.env.LOCAL_ROOT_FOLDER;
const suffix = process.env.SUFFIX || "-gdocs";
const pluginOptions = {
  folder: folderId,
  target: root,
  imagesTarget: path.join(root, "assets/images"),
  suffix: suffix,
  extension: "md",
};

jekyllifyDocs(pluginOptions);
