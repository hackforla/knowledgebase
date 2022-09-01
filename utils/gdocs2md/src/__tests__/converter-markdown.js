const fs = require("fs");
const path = require(`path`);

const { ElementsOfGoogleDocument } = require("../elements-of-google-document");

const documentsPath = path.join(__dirname, "documents");
const filenames = fs.readdirSync(documentsPath);

filenames.forEach(function (filename) {
  const filepath = path.join(documentsPath, filename);
  const file = fs.readFileSync(filepath, "utf8");
  const document = JSON.parse(file);
  const googleDocument = new ElementsOfGoogleDocument({ document });
  const title = googleDocument.document.title;
  googleDocument.process();
  const skip = ["Codes", "Images", "Links"].includes(title);
  const testif = skip ? test.skip : test;
  const skipString = skip ? "- skip (fix later)" : "";
  testif(`Document "${title}" to Markdown ${skipString}`, () => {
    const markdown = googleDocument.toMarkdown();
    expect(markdown).toMatchSnapshot();
  });
});
