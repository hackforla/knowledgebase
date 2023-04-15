const documentLinks = require("./documents/links.json");
const documentTexts = require("./documents/texts.json");
const documentImages = require("./documents/images.json");
const documentFootnotes = require("./documents/footnotes.json");
const documentLists = require("./documents/lists.json");
const documentQuotes = require("./documents/quotes.json");
const documentCodes = require("./documents/codes.json");
const documentTables = require("./documents/tables.json");

import { getMarkdown } from "../jekyllUtils";
import { ElementsOfGoogleDocument } from "../elements-of-google-document";
const optionsForTests = { skipFrontMatter: true, skipDiv: true };

test(`"KeepDefaultStyle" option`, async () => {
  const options = { keepDefaultStype: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentTexts },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`"DemoteHeading" option enabled`, async () => {
  const options = { demoteHeadings: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentTexts },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`"DemoteHeading" option disabled`, async () => {
  const options = { demoteHeadings: false, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentTexts },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Crosslinks between documents`, async () => {
  const links = {
    [documentLinks.documentId]: "/relative-path",
    ["unknow"]: "/404",
  };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentLinks, links },
    options: { ...optionsForTests },
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip headings`, async () => {
  const options = { skipHeadings: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentTexts },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip images`, async () => {
  const options = { skipImages: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentImages },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip footnotes`, async () => {
  const options = { skipFootnotes: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentFootnotes },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip lists`, async () => {
  const options = { skipLists: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentLists },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip quotes`, async () => {
  const options = { skipQuotes: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentQuotes },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip codes`, async () => {
  const options = { skipCodes: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentCodes },
    options,
  });
  expect(markdown).toMatchSnapshot();
});

test(`Skip tables`, async () => {
  const options = { skipTables: true, ...optionsForTests };
  const { markdown } = await getMarkdown({
    gdoc: { document: documentTables },
    options,
  });
  expect(markdown).toMatchSnapshot();
});
