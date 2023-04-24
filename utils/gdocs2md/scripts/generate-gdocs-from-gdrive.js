const path = require("path");
const { fetchGdocs } = require("../src/convert-gdocs");
const { writeContentToFile } = require("../src/save-or-write");
const { config } = require("dotenv");
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env") });
// TODO: replace with desired values
// TODO: read parameters from command line
// Read parameters from command line
const [, , ...args] = process.argv;
const [outputDir] = args;

if (!outputDir) {
  throw new Error("No output directory specified");
}

const customOptions = {
  gdocDir: outputDir,
  saveGdoc: false,
  saveMarkdownToFile: false,
};
console.log("customOptions", customOptions);

saveGdocs();

async function saveGdocs() {
  const gdocs = await fetchGdocs(customOptions);
  console.log("here");
  for (const gdoc of gdocs) {
    writeContentToFile({
      targetDir: "./gdocs",
      suffix: "",
      filename: gdoc.properties.name,
      extension: "json",
      content: JSON.stringify(gdoc),
      options: customOptions,
    });
  }
}
