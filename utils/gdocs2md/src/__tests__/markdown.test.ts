const optionsForTests = { skipFrontMatter: true, skipDiv: true };
import * as fs from "fs";
import * as path from "path";
import { processDeriveAndSaveMarkdowns } from "../convert-gdocs";
import { GdocObj } from "../gdoc-obj";
import { deriveMarkdown } from "../single-gdoc";
test(`"Footnotes" markdown`, async () => {
  const name = "Footnotes";
  const gdocString = fs.readFileSync(
    path.join(__dirname, `mock/features/${name}.json`),
    "utf8"
  );
  const gdoc = JSON.parse(gdocString);
  const options = {
    saveMarkdownToGitHub: false,
    saveGdoc: false,
    saveMarkdownToFile: true,
    saveMarkdownToArray: true,
    skipStyles: true,
    skipDiv: true,
  };
  const gdocObj = new GdocObj(gdoc);
  gdocObj.setElements({}, options);
  const { markdown: actualMarkdown } = deriveMarkdown(gdocObj, options);
  const expectedMarkdown = fs.readFileSync(
    path.join(__dirname, `expected-results/features/markdown/${name}.md`),
    "utf8"
  );
  console.log("expectedMarkdown", expectedMarkdown);
  expect(actualMarkdown).toEqual(expectedMarkdown);
});
