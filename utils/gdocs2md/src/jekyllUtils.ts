import fs from "fs";
const json2md = require("json2md");
const path = require("path");
const pkg = require("lodash");
const { getFrontMatter } = require("./utils.js");
const { writeToGitHub } = require("./githubWrite.js");
const { getData } = require("./utils.js");
const { normalizeElement } = require("./normalize-element");
const { merge: _merge } = pkg;
const {
  fetchGdocsDetails,
} = require("../../googleoauth2-utils/src/google-docs.js");
const { convertGDoc2ElementsObj } = require("./convert");
const {
  FILE_PREFIX,
  DEFAULT_OPTIONS,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_EMAIL,
  GITHUB_NAME,
  GITHUB_COMMIT_MESSAGE,
} = require("./constants.js");

function getRoot() {
  let root = process.argv[1];
  root = root.substring(0, root.lastIndexOf("/gdocs2md")) + "/gdocs2md";
  return root;
}

/**
 * Update the keyValuePairs object with values from the command line
 *
 * @param {*} keyValuePairs
 */
const setObjectValuesFromParamValues = (keyValuePairs: any) => {
  const { argv } = process;
  const paramValues = argv.slice(2);
  paramValues.forEach((paramValue) => {
    let [key, value] = paramValue.split("=");
    let finalValue =
      value.toLowerCase() === "true"
        ? true
        : value.toLowerCase() === "false"
        ? false
        : value;
    keyValuePairs[key] = finalValue;
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
 * @param {*} customOptions
 */
const jekyllifyDocs = async (customOptions: any) => {
  console.log("jekyllifyDocs start");
  // todo: extract to a function
  const options = _merge({}, DEFAULT_OPTIONS, customOptions);
  if (!options.folder) {
    throw new Error("Must provide a folder");
  }
  const gdocs = await getGdocsDetailsAndFilter(options);

  // using "for" loop to avoid async issues
  // otherwise second document will start before everything is done with first
  // end results are fine with "forEach" but cleaner to have all activites done
  // before starting next
  // *** READ ABOVE BEFORE CHANGING TO "forEach" ***
  for (let i = 0; i < gdocs.length; i++) {
    const { filename, markdown, phase_name } = await getMarkdown({
      gdoc: gdocs[i],
      options,
    });

    await saveMarkdown(filename, options, markdown, phase_name);
  }
};

async function getMarkdown({ gdoc, options }: any) {
  const gdocWithElements = convertGDoc2ElementsObj({ gdoc, options });
  const { filename, markdown, phase_name } = await getMarkdownPlus({
    gdocWithElements,
    options,
  });
  return { filename, markdown, phase_name };
}
async function saveMarkdown(
  filename: string,
  options: { saveMarkdownToFile: any; saveMarkdownToGitHub: any; suffix: any },
  markdown: string,
  phase_name: any
) {
  filename = filename.startsWith("/")
    ? filename.substring(1) // remove leading slash
    : filename || "";
  if (filename.indexOf("/") > -1) {
    filename = filename.startsWith(FILE_PREFIX)
      ? filename
      : FILE_PREFIX + filename; // add leading underscore
  }

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

async function getMarkdownPlus({
  gdocWithElements,
  options,
}: {
  gdocWithElements: any;
  options: any;
}) {
  gdocWithElements.options = { ...gdocWithElements.options, ...options };
  const jsonOfElements = gdocWithElements.elements.map(normalizeElement);
  let markdown = json2md(jsonOfElements);
  markdown = addDiv(markdown, options);
  let jsonData = {} as any;
  if (options.getData) {
    jsonData = await getData(
      gdocWithElements.document.documentId,
      gdocWithElements.document.title
    ).catch((error: any) => (jsonData = {}));
  }

  const frontMatter = options.skipFrontMatter
    ? ""
    : getFrontMatter({
        gdoc: gdocWithElements,
        cover: gdocWithElements.cover,
        jsonData,
      });
  markdown = frontMatter + markdown;
  let filename = jsonData.slug || gdocWithElements.properties.path;
  return { filename, markdown, phase_name: jsonData.phase_name || "" };
}

function addDiv(markdown: string, options: any) {
  return options.skipDiv
    ? markdown
    : '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
        markdown +
        "</div>\n</div>";
}

/**
 * Writes markdown to a file
 * @param {*} options
 * @param {*} filename
 * @param {*} markdown
 */
async function writeMarkdown(options: any, filename: any, markdown: any) {
  await writeContent({
    targetDir: options.markdownDir,
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
async function getGdocsDetailsAndFilter(options: any) {
  let gdocs = await fetchGdocsDetails(options);
  // ?? TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    gdocs = gdocs.filter(({ document }: any) => {
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
 * @param {*} customOptions
 */
const jsonifyDocs = async (customOptions: any) => {
  const options = _merge(
    { saveMarkdownToFile: false, saveGdoc: true },
    DEFAULT_OPTIONS,
    customOptions
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
}: any) {
  // todo: make location to write dependent on phase (draft, etc)
  // todo: create a map for status to google folder id
  //${targetDir}/${filename}${suffix}.${extension
  let file = path.join(
    targetDir,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  if (file.startsWith("<root>")) {
    file = file.replace("<root>", getRoot());
  }
  console.log("saving", file);
  const dir = path.dirname(file);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

export {
  setObjectValuesFromParamValues,
  jekyllifyDocs,
  jsonifyDocs,
  getMarkdown,
};
