const fs = require("fs");
const json2md = require("json2md");
const path = require("path");
const pkg = require("lodash");
const { getFrontMatter } = require("./utils.js");
const { writeToGitHub } = require("./githubWrite.js");
const { getData } = require("./utils.js");
const { normalizeElement } = require("./normalize-element");
const { merge: _merge } = pkg;
const {
  fetchBasicGdocsFromDrive,
} = require("../../googleoauth2-utils/src/google-docs.js");
const { convertGDoc2ElementsObj, convertElements2MD } = require("./convert");
const {
  FILE_PREFIX,
  DEFAULT_OPTIONS,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_EMAIL,
  GITHUB_NAME,
  GITHUB_COMMIT_MESSAGE,
} = require("./constants.js");

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
  const gdocs = await getBasicGdocsFromDrive(options);

  // using "for" loop to avoid async issues
  // otherwise second document will start before everything is done with first
  // end results are fine with "forEach" but cleaner to have all activites done
  // before starting next
  // *** READ ABOVE BEFORE CHANGING TO "forEach" ***
  for (let i = 0; i < gdocs.length; i++) {
    const gdocWithElements = convertGDoc2ElementsObj({
      ...gdocs[i],
      options,
    });
    const { filename, markdown, phase_name } = await getMarkdownPlus({
      gdocWithElements,
      options: gdocWithElements.options,
    });
    await saveMarkdown(filename, options, markdown, phase_name);
  }
};

async function saveMarkdown(filename, options, markdown, phase_name) {
  filename = filename.startsWith("/")
    ? filename.substring(1) // remove leading slash
    : filename || "";
  filename = filename.startsWith(FILE_PREFIX)
    ? filename
    : FILE_PREFIX + filename; // add leading underscore

  if (options.saveMarkdownToFile) {
    await writeMarkdown(options, filename, markdown);
  }
  if (options.saveMarkdownToGitHub) {
    let githubFile = `${filename ? filename : "index"}${options.suffix}.md`;
    await writeToGitHub({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      email: GITHUB_EMAIL,
      githubName: GITHUB_NAME,
      path: githubFile,
      message: GITHUB_COMMIT_MESSAGE,
      content: markdown,
      phase_name,
    });
  }
}

async function getMarkdownPlus({ gdocWithElements, options }) {
  const jsonOfElements = gdocWithElements.elements.map(normalizeElement);
  let markdown = addDiv(json2md(jsonOfElements));
  let jsonData = {};
  if (options.getData) {
    jsonData = await getData(
      gdocWithElements.document.documentId,
      gdocWithElements.document.title
    ).catch((error) => (jsonData = {}));
  }
  const frontMatter = getFrontMatter({
    gdoc: gdocWithElements,
    cover: gdocWithElements.cover,
    jsonData,
  });
  markdown = frontMatter + markdown;
  let filename = jsonData.slug || gdocWithElements.properties.path;
  return { filename, markdown, phase_name: jsonData.phase_name || "" };
}

function addDiv(markdown) {
  return (
    '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
    markdown +
    "</div>\n</div>"
  );
}

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
    options: options,
  });
}

/**
 * Filter google docs based on options
 * @param {*} options
 * @returns
 */
async function getBasicGdocsFromDrive(options) {
  let gdocs = await fetchBasicGdocsFromDrive(options);
  // ?? TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    gdocs = gdocs.filter(({ document }) => {
      return document.title
        .toLowerCase()
        .includes(options.matchPattern.toLowerCase());
    });
  }
  return gdocs;
}

/**
 * Saves google docs as json to use for testing.  Does not save markdown.
 * Calls jeklifyDocs with saveMarkdownToFile set to false, saveGdoc set to true
 * @param {*} pluginOptions
 */
const jsonifyDocs = async (pluginOptions) => {
  const options = _merge(
    { saveMarkdownToFile: false, saveGdoc: true },
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
  options,
}) {
  // todo: make location to write dependent on phase (draft, etc)
  // todo: create a map for status to google folder id
  //${targetDir}/${filename}${suffix}.${extension
  const file = path.join(
    targetDir,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  const dir = path.dirname(file);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { setObjectValuesFromParamValues, jekyllifyDocs, jsonifyDocs };
