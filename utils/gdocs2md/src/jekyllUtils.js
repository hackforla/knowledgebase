const fs = require("fs");
const path = require("path");
const pkg = require("lodash");
const { merge: _merge } = pkg;
const {
  fetchGoogleDocumentsObj,
} = require("../../getGdocsTokenAndFetch/src/google-docs.js");
const { convertGDoc2ElementsObj, convertElements2MD } = require("./convert.js");
const { jekyllifyFrontMatter } = require("./utils.js");
const { DEFAULT_OPTIONS } = require("./constants.js");
// TODO: add to constants

const jekyllifyDocs = async (pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const paramValues = getParamValues();
  const matchPattern = paramValues["matchpattern"];
  var googleDocuments = await filterGoogleDocs(options);

  googleDocuments.forEach(async (loopGoogleDocument) => {
    const googleDocument = await convertGDoc2ElementsObj({
      ...loopGoogleDocument,
    });
    let markdown = await convertElements2MD(googleDocument.elements);
    markdown = jekyllifyFrontMatter(googleDocument, markdown);
    const { properties } = googleDocument;
    writeContent({
      target: options.target,
      suffix: options.suffix,
      filename: properties.path,
      extension: options.extension,
      content: markdown,
    });
    // const frontMatter = getFrontMatterFromGdoc(googleDocument);
    // markdown = getFrontMatterFromGdoc(googleDocument, markdown);    // markdown = formatHeading2MarkdownSection(markdown);
    // markdown = addHeading2MarkdownAnchor(markdown);  });
  });
};

async function filterGoogleDocs(options) {
  let googleDocuments = await fetchGoogleDocumentsObj(options);
  // TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    googleDocuments = googleDocuments.filter(({ document }) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }
  return googleDocuments;
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
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const paramValues = getParamValues();
  matchPattern = paramValues["matchpattern"];
  var googleDocuments = await filterGoogleDocs(options);

  console.log("looping", matchPattern);
  googleDocuments.forEach(async (googleDocument) => {
    const { properties } = googleDocument;
    writeContent({
      target: options.target,
      suffix: options.suffix,
      filename: properties.path,
      extension: options.extension,
      content: JSON.stringify(googleDocument),
    });
  });
};

function writeContent({ content, filename, target, suffix, extension }) {
  const file = path.join(
    target,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  console.log("writing", file);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { jekyllifyDocs, jsonifyDocs };
