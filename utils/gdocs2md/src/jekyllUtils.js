const fs = require("fs");
const path = require("path");
const pkg = require("lodash");
const { merge: _merge } = pkg;
const {
  fetchGoogleDocObjs,
} = require("../../googleoauth2-utils/src/google-docs.js");
const { convertGDoc2ElementsObj, convertElements2MD } = require("./convert.js");
const { jekyllifyFrontMatter } = require("./utils.js");
const { DEFAULT_OPTIONS } = require("./constants.js");
const { now } = require("lodash");
// TODO: add to constants
function debugLog() {
  console.log("debug args", Date.now().toString().substring(9), ...arguments);
}

const jekyllifyDocs = async (pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const gdocs = await filterGoogleDocs(options);

  async function processGdoc(gdoc) {
    let googleDocObj = {};
    let doProcessElements = options.saveMarkdown || options.saveJson;
    let doProcessMarkdown = options.saveMarkdown;
    const { properties } = gdoc;
    debugLog("step 1a", Date.now());
    saveGdoc(options, properties, gdoc);
    debugLog("step 2");
    if (!doProcessElements) return;
    googleDocObj = await convertGDoc2ElementsObj({
      ...gdoc,
    });
    debugLog("step4", googleDocObj.properties.path);
    if (!doProcessMarkdown) return;
    let markdown = await convertElements2MD(googleDocObj.elements);
    markdown = jekyllifyFrontMatter(googleDocObj, markdown);
    debugLog("step 5", googleDocObj.properties.path);
    writeContent({
      target: options.targetMarkdownDir,
      suffix: options.suffix,
      filename: properties.path,
      extension: "md",
      content: markdown,
    });
    debugLog("step 6");
  }

  // using "for" loop to avoid async issues
  // otherwise second document will start before everything is done with first
  // end results are fine with "forEach" but cleaner to have all activites done
  // before starting next
  // *** READ ABOVE BEFORE CHANGING TO "forEach" ***
  for (let i = 0; i < gdocs.length; i++) {
    await processGdoc(gdocs[i]);
  }
};

function saveGdoc(options, properties, gdoc) {
  if (options.saveJson) {
    writeContent({
      target: options.targetGdocJson,
      suffix: options.suffix,
      filename: properties.path,
      extension: "json",
      content: JSON.stringify(gdoc),
    });
  }
}

async function filterGoogleDocs(options) {
  let gdocs = await fetchGoogleDocObjs(options);
  // TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    gdocs = gdocs.filter(({ document }) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }
  return gdocs;
}

function getParamValues() {
  const paramValues = {};
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    paramValues[key.toLowerCase()] = value;
  });
  return paramValues;
}

const jsonifyDocs = async (pluginOptions) => {
  const options = _merge(
    { saveMarkdown: false, saveJson: true },
    DEFAULT_OPTIONS,
    pluginOptions
  );
  await jekyllifyDocs(options);
  // TODO: remove below
  // const paramValues = getParamValues();
  // matchPattern = paramValues["matchpattern"];
  // var gdocs = await filterGoogleDocs(options);

  // gdocs.forEach(async (gdoc) => {
  //   const { properties } = gdoc;
  //   writeContent({
  //     target: options.targetMarkdownDir,
  //     suffix: options.suffix,
  //     filename: properties.path,
  //     extension: options.extension,
  //     content: JSON.stringify(gdoc),
  //   });
  // });
};

function writeContent({ content, filename, target, suffix, extension }) {
  const file = path.join(
    target,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  // console.log("writing", file, "x", filename);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { getParamValues, jekyllifyDocs, jsonifyDocs };
