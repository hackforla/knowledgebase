import path from "path";
import { jekyllifyDocs } from "..//src/jekyllUtils.js";

const folderId = process.env("GDRIVE_FOLDER_ID");
const root = process.env("LOCAL_ROOT_FOLDER");
const pluginOptions = {
  folder: folderId,
  target: root,
  imagesTarget: path.join(root, "assets/images"),
  suffix: "x-gdocs",
  extension: "md",
};

jekyllifyDocs(pluginOptions);

const fake = async () => {};

export default fake;
