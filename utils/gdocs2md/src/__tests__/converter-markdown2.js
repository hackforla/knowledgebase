const fs = require("fs");
const path = require(`path`);
const { convertGDoc2ElementsObj, convertElements2MD } = require("../convert");
const { getGatsbyFrontMatter } = require("../gdocs2md-gatsby");

const documentsPath = path.join(__dirname, "documents");
const filenames = fs.readdirSync(documentsPath);

filenames.forEach(function (filename) {
  const filepath = path.join(documentsPath, filename);
  const file = fs.readFileSync(filepath, "utf8");
  const document = JSON.parse(file);
  const googleDocument = convertGDoc2ElementsObj({ document });

  test(`Document2 "${googleDocument.document.title}" to Markdown`, () => {
    const markdownBody = convertElements2MD(googleDocument.elements);
    const frontMatter = getGatsbyFrontMatter(googleDocument);
    const markdown = `${frontMatter}${markdownBody}`;
    expect(markdown).toMatchSnapshot();
  });
});
