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

  let googleDocuments = await fetchDocuments(options);
  // TODO: change to use more standard -- prefix (--var value) instead of split =
  const paramValues = {};
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    paramValues[key.toLowerCase()] = value;
  });
  const matchPattern = paramValues["matchpattern"];
  if (matchPattern) {
    googleDocuments = googleDocuments.filter(({ document }) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }

  console.log("looping", matchPattern);
  googleDocuments.forEach(async (loopGoogleDocument) => {
    console.log("inside");
    const googleDocument = await convertGDoc2ElementsObj({
      ...loopGoogleDocument,
    });
    let markdown = await convertElements2MD(googleDocument.elements);
    // const frontMatter = getFrontMatterFromGdoc(googleDocument);
    // markdown = getFrontMatterFromGdoc(googleDocument, markdown);
    markdown = jekyllifyFrontMatter(googleDocument, markdown);
    // markdown = formatHeading2MarkdownSection(markdown);
    // markdown = addHeading2MarkdownAnchor(markdown);
    const { properties } = googleDocument;
    const file = path.join(
      options.target,
      `${properties.path ? properties.path : "index"}-gdocs.md`
    );
    const dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(
        options.target,
        // TODO: rename path to filename
        `${properties.path ? properties.path : "index"}-gdocs.md`
      ),
      markdown
    );
  });
};

module.exports = { jekyllifyDocs };
