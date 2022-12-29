import {
  jekyllifyDocs,
  setObjectValuesFromParamValues,
} from "../src/jekyllUtils.js";
// default options saveGdoc is false, saveMarkdown is true
const pluginOptions = {};
setObjectValuesFromParamValues(pluginOptions);
jekyllifyDocs(pluginOptions);
