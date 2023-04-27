import { GdocObj } from "../gdoc-obj";

const fs = require("fs");
const path = require(`path`);

// const { ElementsOfGoogleDocument } = require("../elements-of-google-document");

const mockPath = path.join(__dirname, "mock/features");
const filenames = fs.readdirSync(mockPath);
filenames.forEach(function (fullname: any) {
  const filename = fullname.replace(".json", "");
  test(`"${filename}" markdown`, async () => {
    const gdocString = fs.readFileSync(
      path.join(mockPath, `${filename}.json`),
      "utf8"
    );
    const gdoc = JSON.parse(gdocString);
    const skipstyles = filename.toLowerCase().includes("font") ? false : true;
    const options = {
      saveMarkdownToGitHub: false,
      saveMarkdownToFile: true,
      skipstyles,
      skipdiv: true,
    };
    const gdocObj = new GdocObj(gdoc);
    gdocObj.setElements({}, options);
    const cover = gdocObj.cover;
    const elements = gdocObj.elements;

    expect({
      cover,
      elements,
    }).toMatchSnapshot();
  });
});
