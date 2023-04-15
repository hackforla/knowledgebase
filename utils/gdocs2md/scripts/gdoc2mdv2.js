import {
  jekyllifyDocs,
  setObjectValuesFromParamValues,
} from "../src/jekyllUtils.js";
// default options saveGdoc is false, saveMarkdownToFile is true
const customOptions = {};
setObjectValuesFromParamValues(customOptions);
jekyllifyDocs(customOptions);
