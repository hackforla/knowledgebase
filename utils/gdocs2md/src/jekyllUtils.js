const fs = require("fs");
const path = require("path");
const pkg = require("lodash");
const { merge: _merge } = pkg;
const {
  fetchDocuments,
} = require("../../getGdocsTokenAndFetch/src/google-docs.js");
const { convertGDoc2ElementsObj, convertElements2MD } = require("./convert.js");
const { jekyllifyFrontMatter } = require("./utils.js");
const { DEFAULT_OPTIONS } = require("./constants.js");
// TODO: add to constants

const jekyllifyDocs = async (pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const paramValues = getParamValues();
  matchPattern = paramValues["matchpattern"];
  var googleDocuments = await filterGoogleDocs(options);

  console.log("looping", matchPattern);
  googleDocuments.forEach(async (loopGoogleDocument) => {
    console.log("inside");
    const googleDocument = await convertGDoc2ElementsObj({
      ...loopGoogleDocument,
    });
    let markdown = await convertElements2MD(googleDocument.elements);
    markdown = jekyllifyFrontMatter(googleDocument, markdown);
    const { properties } = googleDocument;
    writeMarkdown(options, properties, markdown, "-gdocs.md");
    // const frontMatter = getFrontMatterFromGdoc(googleDocument);
    // markdown = getFrontMatterFromGdoc(googleDocument, markdown);    // markdown = formatHeading2MarkdownSection(markdown);
    // markdown = addHeading2MarkdownAnchor(markdown);  });
  });
};

async function filterGoogleDocs(options) {
  let googleDocuments = await fetchDocuments(options);
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
    console.log("inside");
    const { properties } = googleDocument;
    writeMarkdown(
      options,
      properties,
      JSON.stringify(googleDocument),
      "-gdocs.json"
    );
  });
};

function writeMarkdown(
  options,
  properties,
  markdown,
  suffixAndExtension = ".md"
) {
  const file = path.join(
    options.target,
    `${properties.path ? properties.path : "index"}${suffixAndExtension}`
  );
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, markdown);
}

module.exports = { jekyllifyDocs, jsonifyDocs };
