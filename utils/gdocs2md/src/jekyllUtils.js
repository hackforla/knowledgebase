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
// TODO: add to constants

const jekyllifyDocs = async (pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  var googleDocuments = await filterGoogleDocs(options);

  googleDocuments.forEach(async (googleDocument) => {
    const { properties } = googleDocument;
    if (options.saveJson) {
      writeContent({
        target: options.target,
        suffix: options.suffix,
        filename: properties.path,
        extension: "json",
        content: JSON.stringify(googleDocument),
      });
    }
    if (!options.saveMarkdown) {
      return;
    }
    const googleDocObj = await convertGDoc2ElementsObj({
      ...googleDocument,
    });
    let markdown = await convertElements2MD(googleDocObj.elements);
    markdown = jekyllifyFrontMatter(googleDocObj, markdown);
    writeContent({
      target: options.target,
      suffix: options.suffix,
      filename: properties.path,
      extension: "md",
      content: markdown,
    });
    // const frontMatter = getFrontMatterFromGdoc(googleDocument);
    // markdown = getFrontMatterFromGdoc(googleDocument, markdown);    // markdown = formatHeading2MarkdownSection(markdown);
    // markdown = addHeading2MarkdownAnchor(markdown);  });
  });
};

async function filterGoogleDocs(options) {
  let googleDocuments = await fetchGoogleDocObjs(options);
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
  // console.log("writing", file, "x", filename);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { getParamValues, jekyllifyDocs, jsonifyDocs };
