import * as fs from "fs";
import * as path from "path";
const { config } = require("dotenv");
config({ path: path.resolve(__dirname, "./.env") });

async function main() {
  const actualDocumentsPath = path.join(
    __dirname,
    "actual-results/markdowns-generated-from-google-drive"
  );
  const expectedDocumentsPath = path.join(
    __dirname,
    "expected-results/markdowns-generated-from-google-drive"
  );
  console.log(
    "actualDocumentsPath",
    actualDocumentsPath,
    "expectedDocumentsPath",
    expectedDocumentsPath
  );
  const filenames = fs.readdirSync(expectedDocumentsPath);

  filenames.forEach(function (filename: string) {
    test(`Document "${filename}" converted to Markdown`, () => {
      const actualMarkdown = fs.readFileSync(
        path.join(actualDocumentsPath, filename),
        "utf8"
      );
      const expectedMarkdown = fs.readFileSync(
        path.join(expectedDocumentsPath, filename),
        "utf8"
      );
      expect(actualMarkdown).toEqual(expectedMarkdown);
    });
  });
}

main();
