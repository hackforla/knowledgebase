const fs = require("fs");
const path = require("path");
const pkg = require("lodash");
const axios = require("axios");
const { writeToFile } = require("./githubWrite.js");
const { merge: _merge } = pkg;
const {
  fetchGoogleDocObjs,
} = require("../../googleoauth2-utils/src/google-docs.js");
const { convertGDoc2ElementsObj, convertElements2MD } = require("./convert.js");
const { jekyllifyFrontMatter } = require("./utils.js");
const { DEFAULT_OPTIONS, GITHUB_OWNER, GITHUB_REPO,GITHUB_EMAIL } = require("./constants.js");

function debugLog() {
  console.log("debug args", Date.now().toString().substring(9), ...arguments);
}

/**
 * Update the keyValuePairs object with values from the command line
 *
 * @param {*} keyValuePairs
 */
const setObjectValuesFromParamValues = (keyValuePairs) => {
  const { argv } = process;
  const paramValues = argv.slice(2);
  paramValues.forEach((paramValue) => {
    let [key, value] = paramValue.split("=");
    if (value.toLowerCase() == "true") value = true;
    if (value.toLowerCase() == "false") value = false;
    keyValuePairs[key] = value;
  });
};

/**
 * Convert a google doc object to markdown and save
 * @param {*} gdoc
 * @returns
 */
async function processGdoc(gdoc, options) {
  let googleDocObj = {};
  const { properties } = gdoc;
  const filename = properties.path;
  googleDocObj = await convertGDoc2ElementsObj({
    ...gdoc,
  });
  if (options.saveGdoc) writeGdoc(options, filename, gdoc);
  if (!options.saveMarkdown) return;
  let markdown = await convertElements2MD(googleDocObj.elements);
  // todo: remove markdown from parameters
  // todo: inject jekliffyFrontMatter function
  markdown = await jekyllifyFrontMatter(googleDocObj, markdown);
  await writeMarkdown(options, filename, markdown);
}

/**
 * Based on the options, filter google docs from specified folder and process them,
 * with final product being markdown files
 * @param {*} pluginOptions
 */
const jekyllifyDocs = async (pluginOptions) => {
  console.log("jekyllifyDocs start");
  // todo: extract to a function
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  if (!options.folder) {
    throw new Error("Must provide a folder");
  }
  const gdocs = await filterGoogleDocs(options);

  // using "for" loop to avoid async issues
  // otherwise second document will start before everything is done with first
  // end results are fine with "forEach" but cleaner to have all activites done
  // before starting next
  // *** READ ABOVE BEFORE CHANGING TO "forEach" ***
  for (let i = 0; i < gdocs.length; i++) {
    await processGdoc(gdocs[i], options).catch((err) => {
      console.log("Error", err);
    });
  }
};

/**
 * Writes markdown to a file
 * @param {*} options
 * @param {*} filename
 * @param {*} markdown
 */
async function writeMarkdown(options, filename, markdown) {
  await writeContent({
    targetDir: options.targetMarkdownDir,
    suffix: options.suffix,
    filename,
    extension: "md",
    content: markdown,
  });
}

/**
 * Converts googledoc to json and saves to file
 * @param {*} options
 * @param {*} filename
 * @param {*} gdoc
 */
async function writeGdoc(options, filename, gdoc) {
  await writeContent({
    targetDir: options.targetGdocJson,
    suffix: options.suffix,
    filename,
    extension: "json",
    content: JSON.stringify(gdoc),
  });
}

/**
 * Filter google docs based on options
 * @param {*} options
 * @returns
 */
async function filterGoogleDocs(options) {
  let gdocs = await fetchGoogleDocObjs(options);
  // ?? TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    gdocs = gdocs.filter(({ document }) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }
  return gdocs;
}

/**
 * Saves google docs as json to use for testing.  Does not save markdown.
 * Calls jeklifyDocs with saveMarkdown set to false, saveGdoc set to true
 * @param {*} pluginOptions
 */
const jsonifyDocs = async (pluginOptions) => {
  const options = _merge(
    { saveMarkdown: false, saveGdoc: true },
    DEFAULT_OPTIONS,
    pluginOptions
  );
  await jekyllifyDocs(options);
};

/**
 * Saves contentto a local file.
 * @param { content, filename, target, suffix, extension }
 */
async function writeContent({
  content,
  targetDir,
  filename,
  suffix,
  extension,
}) {
  // todo: make location to write dependent on status (draft, etc)
  // todo: create a map for status to google folder id
  //${targetDir}/${filename}${suffix}.${extension
  let githubFile = `${filename ? filename : "index"}${suffix}.${extension}`;
  if (githubFile.startsWith("/")) githubFile = githubFile.substring(1);
  console.log("debug githubFile", githubFile);

  console.log("writing markdown", targetDir, filename, suffix, extension);
  const file = path.join(
    targetDir,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  const dir = path.dirname(file);
  await writeToFile({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,,
    path: githubFile,
    message: "Automated commit",
    content: content,
  });

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { setObjectValuesFromParamValues, jekyllifyDocs, jsonifyDocs };
