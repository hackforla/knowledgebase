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
  var gdocs = await filterGoogleDocs(options);

  gdocs.forEach(async (gdoc) => {
    const { properties } = gdoc;
    if (options.saveJson) {
      writeContent({
        target: options.targetGdocJson,
        suffix: options.suffix,
        filename: properties.path,
        extension: "json",
        content: JSON.stringify(gdoc),
      });
    }
    if (!options.saveMarkdown) {
      return;
    }
    const googleDocObj = await convertGDoc2ElementsObj({
      ...gdoc,
    });
    let markdown = await convertElements2MD(googleDocObj.elements);
    markdown = jekyllifyFrontMatter(googleDocObj, markdown);
    writeContent({
      target: options.targetMarkdownDir,
      suffix: options.suffix,
      filename: properties.path,
      extension: "md",
      content: markdown,
    });
    // const frontMatter = getFrontMatterFromGdoc(gdoc);
    // markdown = getFrontMatterFromGdoc(gdoc, markdown);    // markdown = formatHeading2MarkdownSection(markdown);
    // markdown = addHeading2MarkdownAnchor(markdown);  });
  });
};

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
