const fs = require("fs");
const path = require(`path`);

// const { ElementsOfGoogleDocument } = require("../elements-of-google-document");

const documentsPath = path.join(__dirname, "gdocs-json");
const filenames = fs.readdirSync(documentsPath);
filenames.forEach(function (filename: any) {
  test(`Document "${googleDocument.document.title}" to Objects`, () => {
    const { cover, elements } = googleDocument;

    expect({
      cover,
      elements,
    }).toMatchSnapshot();
  });
});
