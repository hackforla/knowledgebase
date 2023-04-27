const path = require("path");
const { config } = require("dotenv");
const { getPluginOptions } = require("../utils");
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });
process.env.ENV_PATH = envPath;

const testMarkdownPluginOptions = getPluginOptions({
  folderid: process.env.TEST_GDRIVE_ROOT_ID,
  root: process.env.TEST_LOCAL_ROOT_DIR,
  subdir: "actual-results/markdowns-generated-from-google-drive",
  suffix: process.env.TEST_SUFFIX,
  saveMarkdownToFile: true,
});

const mockPluginOptions = getPluginOptions({
  folderid: process.env.MOCK_GDRIVE_ROOT_ID,
  root: process.env.MOCK_LOCAL_ROOT_DIR,
  suffix: process.env.MOCK_SUFFIX,
  saveGdoc: true,
  saveMarkdownToFile: false,
});

module.exports = {
  mockPluginOptions,
  testMarkdownPluginOptions,
};
