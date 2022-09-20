const fs = require("fs");
const path = require(`path`);
const { jekyllifyDocs } = require("../jekyllUtils.js");
const { config } = require("dotenv");
config({ path: path.resolve(__dirname, "./.env") });

const folderId = process.env.GDRIVE_TEST_FOLDER_ID;
const root = process.env.LOCAL_TEST_ROOT;
const suffix = process.env.SUFFIX;

const pluginOptions = {
  folder: folderId,
  target: path.join(root, "markdown-documents"),
  imagesTarget: path.join(root, "assets/images"),
  suffix: suffix,
  extension: "md",
};

async function main() {
  const actualDocumentsPath = path.join(
    __dirname,
    "actual-results/markdowns-generated-from-google-drive"
  );
  const expectedDocumentsPath = path.join(
    __dirname,
    "expected-results/markdowns-generated-from-google-drive"
  );
  const filenames = fs.readdirSync(actualDocumentsPath);

  filenames.forEach(function (filename) {
    test(`Document "${filename}" converted to Markdown`, () => {
      const actualMarkdown = fs.readFileSync(
        path.join(actualDocumentsPath, filename)
      );
      const expectedMarkdown = fs.readFileSync(
        path.join(expectedDocumentsPath, filename)
      );
      expect(actualMarkdown).toEqual(expectedMarkdown);
    });
  });
}

main();
