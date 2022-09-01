const fs = require("fs");
const path = require(`path`);

const { ElementsOfGoogleDocument } = require("../elements-of-google-document");

const documentsPath = path.join(__dirname, "gdocs-json");
const filenames = fs.readdirSync(documentsPath);
console.log("debug", documentsPath);
filenames.forEach(function (filename) {
  const filepath = path.join(documentsPath, filename);
  const file = fs.readFileSync(filepath, "utf8");
  const parsedGdoc = JSON.parse(file);
  const googleDocument = new ElementsOfGoogleDocument({
    ...parsedGdoc,
  });
  googleDocument.process();

  test(`Document "${googleDocument.document.title}" to Object`, () => {
    const { cover, elements } = googleDocument;

    expect({
      cover,
      elements,
    }).toMatchSnapshot();
  });
});
