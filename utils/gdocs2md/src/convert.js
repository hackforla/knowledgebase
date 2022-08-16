const { ElementsOfGoogleDocument } = require("./elements-of-google-document");

const convertGDoc2Object = (gDoc) => {
  return ElementsOfGoogleDocument.convertGDoc2Elements(gDoc);
};

module.exports = {
  convertGDoc2Object,
};
