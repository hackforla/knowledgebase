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
const optionsForTests = { skipFrontMatter: true, skipdiv: true };

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
// xx test(`"KeepDefaultStyle" option`, async () => {s
//   xx options = { keepDefaultStype: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`"DemoteHeading" option enabled`, async () => {
//   xx options = { demoteheadings: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`"DemoteHeading" option disabled`, async () => {
//   xx options = { demoteheadings: false, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// test.skip(`Crosslinks between documents`, async () => {
//   const links = {
//     [documentLinks.documentId]: "/relative-path",
//     ["unknow"]: "/404",
//   };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentLinks },
//     options: { ...optionsForTests },
//     links,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip headings`, async () => {
//   xx options = { skipheadings: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip images`, async () => {
//   xx options = { skipimages: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentImages },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip footnotes`, async () => {
//   xx options = { skipfootnotes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentFootnotes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip lists`, async () => {
//   xx options = { skiplists: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentLists },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip quotes`, async () => {
//   xx options = { skipquotes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentQuotes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip codes`, async () => {
//   xx options = { skipcodes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentCodes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip tables`, async () => {
//   xx options = { skiptables: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTables },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });
