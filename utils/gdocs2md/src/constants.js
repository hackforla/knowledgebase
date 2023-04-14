const path = require("path");
const { config } = require("dotenv");
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });
process.env.ENV_PATH = envPath;

const folderId = process.env.WEBSITE_GDRIVE_ROOT_ID;
const root = process.env.WEBSITE_LOCAL_ROOT;
const suffix = process.env.WEBSITE_SUFFIX;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_NAME = process.env.GITHUB_NAME;
const GITHUB_EMAIL = process.env.GITHUB_EMAIL;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = JSON.parse(process.env.GITHUB_BRANCH);
const GITHUB_COMMIT_MESSAGE =
  process.env.GITHUB_COMMIT_MESSAGE || "Update from Google Docs";
const FILE_PREFIX = process.env.FILE_PREFIX || "";

module.exports = {
  FILE_PREFIX,
  GITHUB_TOKEN,
  GITHUB_NAME,
  GITHUB_EMAIL,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_COMMIT_MESSAGE,
  GITHUB_BRANCH,
  ENV_TOKEN_VAR: "GOOGLE_DOCS_TOKEN",
  DEFAULT_OPTIONS: {
    debug: false,
    demoteHeadings: true,
    folder: folderId,
    imagesTarget: path.join(root, "assets/images"),
    keepDefaultStyle: false,
    matchPattern: "",
    pageContext: [],
    saveGdoc: false,
    saveMarkdownToFile: true,
    skipDiv: false,
    skipCodes: false,
    skipFootnotes: false,
    skipHeadings: false,
    skipImages: false,
    skipLists: false,
    skipQuotes: false,
    skipStyles: false,
    skipTables: false,
    suffix: suffix,
    markdownDir: root,
  },
};
