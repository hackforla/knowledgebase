const { setOptionsFromArgs } = require("../src/utils");
const { getOutputdir } = require("../src/utils");
const { deriveAndSaveMarkdowns } = require("../src/convert-gdocs");

const [, , ...args] = process.argv;
const outputdir = getOutputdir(args);
const options = {
  folderid: process.env.WEBSITE_GDRIVE_ROOT_ID,
  outputdir,
  savemarkdowntofile: true,
  savemarkdowntogithub: false,
};

setOptionsFromArgs(options, args);

deriveAndSaveMarkdowns(options);
