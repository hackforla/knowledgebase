const { setOptionsFromArgs } = require("../src/utils");
const { getOutputdir } = require("../src/utils");
const { saveGdocs } = require("../src/convert-gdocs");

const [, , ...args] = process.argv;
const outputdir = getOutputdir(args);

const options = {
  outputdir,
  extension: "json",
};
if (!outputdir) {
  throw new Error("No output directory specified");
}

setOptionsFromArgs(options, args);

saveGdocs(options);
