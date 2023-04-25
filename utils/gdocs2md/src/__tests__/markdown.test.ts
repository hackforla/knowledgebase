const optionsForTests = { skipFrontMatter: true, skipDiv: true };
import * as fs from "fs";
import * as path from "path";
import { GdocObj } from "../gdoc-obj";
import { deriveMarkdown } from "../single-gdoc";
const expectedDocumentsPath = path.join(__dirname, "expected-results/features");
const mockPath = path.join(__dirname, "mock/features");

const fullnames = fs.readdirSync(mockPath);
const fullnamesJson = fullnames.filter((fullname) =>
  fullname.endsWith(".json")
);

fullnamesJson.forEach(function (fullname: string) {
  const filename = fullname.replace(".json", "");
  test(`"${filename}" markdown`, async () => {
    const gdocString = fs.readFileSync(
      path.join(mockPath, `${filename}.json`),
      "utf8"
    );
    const gdoc = JSON.parse(gdocString);
    const skipStyles = filename.toLowerCase().includes("font") ? false : true;
    const options = {
      saveMarkdownToGitHub: false,
      saveGdoc: false,
      saveMarkdownToFile: true,
      saveMarkdownToArray: true,
      skipStyles,
      skipDiv: true,
    };
    const gdocObj = new GdocObj(gdoc);
    gdocObj.setElements({}, options);
    const { markdown: actualMarkdown } = deriveMarkdown(gdocObj, options);
    const expectedMarkdown = fs.readFileSync(
      path.join(expectedDocumentsPath, `${filename.toLowerCase()}.md`),
      "utf8"
    );
    expect(actualMarkdown).toEqual(expectedMarkdown);
  });
});
