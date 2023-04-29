import {
  jekyllifyDocs,
  setObjectValuesFromParamValues,
} from "../src/jekyllUtils.js";
// default options saveGdoc is false, savemarkdowntofile is true
const customOptions = {};
setObjectValuesFromParamValues(customOptions);
jekyllifyDocs(customOptions);
