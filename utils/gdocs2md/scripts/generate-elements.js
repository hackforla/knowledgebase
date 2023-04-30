const { setOptionsFromArgs } = require("../src/utils");
const { getOutputdir } = require("../src/utils");
const { deriveAndSaveElements } = require("../src/convert-gdocs");

const [, , ...args] = process.argv;
const outputdir = getOutputdir(args);

const options = {
  outputdir,
  extension: "elements.json",
};

setOptionsFromArgs(options, args);

if (!outputdir || outputdir.startsWith("-")) {
  throw new Error("No output directory specified");
}

deriveAndSaveElements(options);
