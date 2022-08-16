const { ElementsOfGoogleDocument } = require("./elements-of-google-document");
const = require("yamljs");

const convertGDoc2ElementsObj = (gDoc) => {
  const obj = new ElementsOfGoogleDocument(...gDoc);
  obj.process();
  return obj.elements;
};

const convertElementsObj2MD = (elements) => {
  const json = this.elements.map((element) =>
    Array.isArray(element) ? element : [element]
  );
  return json2md(json);
};

module.exports = {
  convertGDoc2ElementsObj,
  convertElementsObj2MD,
};
