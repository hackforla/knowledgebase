const documentLinks = require("./documents/links.json");
const documentTexts = require("./documents/texts.json");
const documentImages = require("./documents/images.json");
const documentFootnotes = require("./documents/footnotes.json");
const documentLists = require("./documents/lists.json");
const documentQuotes = require("./documents/quotes.json");
const documentCodes = require("./documents/codes.json");
const documentTables = require("./documents/tables.json");
const { ElementsOfGoogleDocument } = require("../../src/google-document");

test(`"KeepDefaultStyle" option`, () => {
  const options = { keepDefaultStyle: true };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentTexts,
    options,
  });
  googleDocument.process();
  expect(googleDocument.toMarkdown()).toMatchSnapshot();
});

test(`"DemoteHeading" option enabled`, () => {
  const options = { demoteHeadings: true };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentTexts,
    options,
  });
  googleDocument.process();
  expect(googleDocument.toMarkdown()).toMatchSnapshot();
});

test(`"DemoteHeading" option disabled`, () => {
  const options = { demoteHeadings: false };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentTexts,
    options,
  });
  googleDocument.process();
  expect(googleDocument.toMarkdown()).toMatchSnapshot();
});

test(`Crosslinks between documents`, () => {
  const links = {
    [documentLinks.documentId]: "/relative-path",
    ["unknow"]: "/404",
  };

  const googleDocument = new ElementsOfGoogleDocument({
    document: documentLinks,
    links,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip headings`, () => {
  const options = {
    skipHeadings: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentTexts,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip images`, () => {
  const options = {
    skipImages: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentImages,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip footnotes`, () => {
  const options = {
    skipFootnotes: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentFootnotes,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip lists`, () => {
  const options = {
    skipLists: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentLists,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip quotes`, () => {
  const options = {
    skipQuotes: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentQuotes,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip codes`, () => {
  const options = {
    skipCodes: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentCodes,
    options,
  });
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});

test(`Skip tables`, () => {
  const options = {
    skipTables: true,
  };
  const googleDocument = new ElementsOfGoogleDocument({
    document: documentTables,
    options,
  });
  googleDocument.process();
  const documentObject = googleDocument.toMarkdown();
  expect(documentObject).toMatchSnapshot();
});
