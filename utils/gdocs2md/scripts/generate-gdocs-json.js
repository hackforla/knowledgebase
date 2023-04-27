const path = require("path");
const { fetchGdocs } = require("../src/convert-gdocs");
const { writeContentToFile } = require("../src/save-or-write");
const { config } = require("dotenv");
// Read .env file from directory where command is issued
config({ path: path.resolve(process.cwd(), ".env") });
// TODO: read parameters from command line
const [, , ...args] = process.argv;
const [outputdir, suffix] = args;

if (!outputdir) {
  throw new Error("No output directory specified");
}

saveGdocs({ targetDir: outputdir, suffix: suffix || "" });

async function saveGdocs(options) {
  const gdocs = await fetchGdocs(options);
  for (const gdoc of gdocs) {
    writeContentToFile({
      filename: gdoc.properties.name,
      targetDir: options.targetDir,
      extension: "json",
      content: JSON.stringify(gdoc),
      suffix: options.suffix,
    });
  }
}
