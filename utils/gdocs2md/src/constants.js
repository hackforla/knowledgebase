const path = require("path");
const { config } = require("dotenv");
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });
process.env.ENV_PATH = envPath;
const folderId = process.env.WEBSITE_GDRIVE_ROOT_ID;
const root = process.env.WEBSITE_LOCAL_ROOT;
const suffix = process.env.WEBSITE_SUFFIX;
module.exports = {
  ENV_TOKEN_VAR: "GOOGLE_DOCS_TOKEN",
  DEFAULT_OPTIONS: {
    debug: false,
    demoteHeadings: true,
    folder: folderId,
    // TODO: change to assets/images/(subdir), change to go up a level
    imagesTarget: path.join(root, "assets/images"),
    keepDefaultStyle: false,
    matchPattern: "",
    pageContext: [],
    saveGdoc: false,
    saveMarkdown: true,
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
