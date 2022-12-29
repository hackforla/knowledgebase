const path = require("path");
const { config } = require("dotenv");
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });
process.env.ENV_PATH = envPath;

const testMarkdownPluginOptions = getPluginOptions({
  folderId: process.env.TEST_GDRIVE_ROOT_ID,
  root: process.env.TEST_LOCAL_ROOT_DIR,
  suffix: process.env.TEST_SUFFIX,
  saveGdoc: false,
  saveMarkdown: true,
});

const mockPluginOptions = getPluginOptions({
  folderId: process.env.MOCK_GDRIVE_ROOT_ID,
  root: process.env.MOCK_LOCAL_ROOT_DIR,
  suffix: process.env.MOCK_SUFFIX,
  saveGdoc: true,
  saveMarkdown: false,
});

function getPluginOptions({ folderId, root, suffix, saveGdoc, saveMarkdown }) {
  return {
    folder: folderId,
    targetMarkdownDir: path.join(
      root,
      "actual-results/markdowns-generated-from-google-drive"
    ),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    saveMarkdown,
  };
}

const folderId = process.env.WEBSITE_GDRIVE_ROOT_ID;
const root = process.env.WEBSITE_LOCAL_ROOT;
const suffix = process.env.WEBSITE_SUFFIX;
module.exports = {
  ENV_TOKEN_VAR: "GOOGLE_DOCS_TOKEN",
  mockPluginOptions,
  testMarkdownPluginOptions,
  DEFAULT_OPTIONS: {
    debug: false,
    demoteHeadings: true,
    folder: folderId,
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
