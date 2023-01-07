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
  saveMarkdownToFile: true,
});

const mockPluginOptions = getPluginOptions({
  folderId: process.env.MOCK_GDRIVE_ROOT_ID,
  root: process.env.MOCK_LOCAL_ROOT_DIR,
  suffix: process.env.MOCK_SUFFIX,
  saveGdoc: true,
  saveMarkdownToFile: false,
});

function getPluginOptions({
  folderId,
  root,
  suffix,
  saveGdoc,
  saveMarkdownToFile,
}) {
  return {
    folder: folderId,
    targetMarkdownDir: path.join(
      root,
      "actual-results/markdowns-generated-from-google-drive"
    ),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    saveMarkdownToFile,
  };
}
module.exports = {
  mockPluginOptions,
  testMarkdownPluginOptions,
};
