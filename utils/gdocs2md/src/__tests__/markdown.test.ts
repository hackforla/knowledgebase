const optionsForTests = { skipFrontMatter: true, skipDiv: true };
import * as fs from "fs";
import * as path from "path";
import { processDeriveAndSaveMarkdowns } from "../convert-gdocs";
test(`"Footnotes" markdown`, async () => {
  const name = "Footnotes";
  const gdoc = fs.readFileSync(
    path.join(__dirname, `mock/features/${name}.json`),
    "utf8"
  );
  const options = {
    saveMarkdownToGitHub: false,
    saveGdoc: false,
    saveMarkdownToFile: true,
    saveMarkdownToArray: true,
  };
  processDeriveAndSaveMarkdowns([gdoc], options);
  console.log(gdoc);
});
