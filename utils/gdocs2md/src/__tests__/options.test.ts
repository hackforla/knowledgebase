import fs from "fs";
import { GdocObj } from "../gdoc-obj";
import { deriveMarkdown } from "../single-gdoc";
import path from "path";

const mockPath = path.join(__dirname, "mock/options");

const testArray = [
  [`"KeepDefaultStyle" option`, { keepDefaultStype: true }, "texts"],
  [`"DemoteHeading" option enabled`, { demoteHeadings: true }, "texts"],
  [`"DemoteHeading" option disabled`, { demoteHeadings: false }, "texts"],
  [`Skip headings`, { skipHeadings: true }, "texts"],
  [`Skip images`, { skipImages: true }, "images"],
  [`Skip footnotes`, { skipFootnotes: true }, "footnotes"],
  [`Skip lists`, { skipLists: true }, "lists"],
  [`Skip quotes`, { skipQuotes: true }, "quotes"],
  [`Skip codes`, { skipCodes: true }, "codes"],
  [`Skip tables`, { skipTables: true }, "tables"],
];
const optionsForTests = { skipFrontMatter: true, skipDiv: true };

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
//   xx options = { demoteHeadings: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`"DemoteHeading" option disabled`, async () => {
//   xx options = { demoteHeadings: false, ...optionsForTests };
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
//   xx options = { skipHeadings: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTexts },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip images`, async () => {
//   xx options = { skipImages: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentImages },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip footnotes`, async () => {
//   xx options = { skipFootnotes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentFootnotes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip lists`, async () => {
//   xx options = { skipLists: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentLists },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip quotes`, async () => {
//   xx options = { skipQuotes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentQuotes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip codes`, async () => {
//   xx options = { skipCodes: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentCodes },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });

// xx test(`Skip tables`, async () => {
//   xx options = { skipTables: true, ...optionsForTests };
//   const { markdown } = await getMarkdown({
//     xx gdoc: { document: documentTables },
//     options,
//   });
//   expect(markdown).toMatchSnapshot();
// });
