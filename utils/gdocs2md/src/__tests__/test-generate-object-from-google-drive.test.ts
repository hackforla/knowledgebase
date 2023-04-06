const fs = require("fs");
const path = require(`path`);

import { ElementsOfGoogleDocument } from "../elements-of-google-document";
// const { ElementsOfGoogleDocument } = require("../elements-of-google-document");

const documentsPath = path.join(__dirname, "gdocs-json");
const filenames = fs.readdirSync(documentsPath);
filenames.forEach(function (filename: any) {
  const filepath = path.join(documentsPath, filename);
  const file = fs.readFileSync(filepath, "utf8");
  const parsedGdoc = JSON.parse(file);
  const options = { skipStyles: false };
  const googleDocument = new ElementsOfGoogleDocument({
    ...parsedGdoc,
    options,
  });
  googleDocument.process(googleDocument.options);

  test(`Document "${googleDocument.document.title}" to Objects`, () => {
    const { cover, elements } = googleDocument;

    expect({
      cover,
      elements,
    }).toMatchSnapshot();
  });
});
