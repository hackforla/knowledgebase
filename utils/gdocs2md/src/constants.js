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
const GITHUB_COMMIT_MESSAGE =
  process.env.GITHUB_COMMIT_MESSAGE || "Update from Google Docs";
console.log(
  "env debug",
  GITHUB_REPO,
  "x",
  GITHUB_COMMIT_MESSAGE,
  "x",
  process.env
);

module.exports = {
  GITHUB_TOKEN,
  GITHUB_NAME,
  GITHUB_EMAIL,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_COMMIT_MESSAGE,
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
    skipCodes: false,
    skipFootnotes: false,
    skipHeadings: false,
    skipImages: false,
    skipLists: false,
    skipQuotes: false,
    skipTables: false,
    suffix: suffix,
    testFolderGoogleId: "1w4pvs1_bBiu_hvC-lZQR1zw-h-GdRLP3",
    targetMarkdownDir: root,
  },
};
