const fs = require("fs");
const path = require(`path`);
const { jekyllifyDocs } = require("../jekyllUtils.js");
const { config } = require("dotenv");
config({ path: path.resolve(__dirname, "./.env") });

async function main() {
  const actualDocumentsPath = path.join(__dirname, "actual-results");
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
