import {
  jekyllifyDocs,
  setObjectValuesFromParamValues,
} from "../src/jekyllUtils.js";
const pluginOptions = {};
setObjectValuesFromParamValues(pluginOptions);
jekyllifyDocs(pluginOptions);
