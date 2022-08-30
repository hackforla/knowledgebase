import path from "path";
import { jekyllifyDocs } from "..//src/jekyllUtils.js";

const root = "/Users/ethanadmin/projects/hackforla-website";
const pluginOptions = {
  folder: "1R2fYUh2EwbLot9Akm311Osxpl7WbvEvM",
  target: root,
  imagesTarget: path.join(root, "assets/images"),
};

jekyllifyDocs(pluginOptions);

const fake = async () => {};

export default fake;
