const path = require("path");
const { fetchGdocs } = require("../src/convert-gdocs");
const { writeContentToFile } = require("../src/save-or-write");
const { config } = require("dotenv");
const { GdocObj } = require("../src/gdoc-obj");
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env") });
// TODO: read parameters from command line
const [, , ...args] = process.argv;
const [outputDir, suffix] = args;

if (!outputDir) {
  throw new Error("No output directory specified");
}

saveElements({ targetDir: outputDir, suffix: suffix || "" });

async function saveElements(options) {
  const gdocs = await fetchGdocs(options);
  for (const gdoc of gdocs) {
    const gdocObj = new GdocObj(gdoc);
    gdocObj.setElements({}, options);
    await writeContentToFile({
      filename: gdocObj.properties.name,
      targetDir: options.targetDir,
      extension: "elements.json",
      content: JSON.stringify(gdocObj.elements),
      suffix: options.suffix,
    });
  }
}
