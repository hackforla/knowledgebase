import fs from "fs";
import { GdocObj } from "../gdoc-obj";
import { deriveMarkdown } from "../single-gdoc";
import path from "path";

const mockPath = path.join(__dirname, "mock/options");

const testArray = [
  [`"KeepDefaultStyle" option`, { keepDefaultStype: true }, "texts"],
  [`"DemoteHeading" option enabled`, { demoteheadings: true }, "texts"],
  [`"DemoteHeading" option disabled`, { demoteheadings: false }, "texts"],
  [`Skip headings`, { skipheadings: true }, "texts"],
  [`Skip images`, { skipimages: true }, "images"],
  [`Skip footnotes`, { skipfootnotes: true }, "footnotes"],
  [`Skip lists`, { skiplists: true }, "lists"],
  [`Skip quotes`, { skipquotes: true }, "quotes"],
  [`Skip codes`, { skipcodes: true }, "codes"],
  [`Skip tables`, { skiptables: true }, "tables"],
];
const optionsForTests = { skipfrontmatter: true, skipdiv: true };

for (const testValues of testArray) {
  const testname = testValues[0] as string;
  const options = { ...(testValues[1] as any), ...optionsForTests };
  const filename = path.join(mockPath, testValues[2] as string) + ".json";
  test(testname, async () => {
    const gdocText = fs.readFileSync(filename, "utf8");
    const gdocParsed = JSON.parse(gdocText);
    const gdocObj = new GdocObj(gdocParsed);
    gdocObj.setElements({}, options);
    const { markdown } = deriveMarkdown(gdocObj, options);
    expect(markdown).toMatchSnapshot();
  });
}
