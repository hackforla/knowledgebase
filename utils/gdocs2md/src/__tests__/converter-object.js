const fs = require("fs");
const path = require(`path`);

const {
  ElementsOfGoogleDocument: GoogleDocument,
} = require("../../src/google-document");

const documentsPath = path.join(__dirname, "documents");
const filenames = fs.readdirSync(documentsPath);

filenames.forEach(function (filename) {
  const filepath = path.join(documentsPath, filename);
  const file = fs.readFileSync(filepath, "utf8");
  const document = JSON.parse(file);
  const googleDocument = new GoogleDocument({ document });
  googleDocument.process();

  test(`Document "${googleDocument.document.title}" to Object`, () => {
    const { cover, elements } = googleDocument;

    expect({
      cover,
      elements,
    }).toMatchSnapshot();
  });
});
