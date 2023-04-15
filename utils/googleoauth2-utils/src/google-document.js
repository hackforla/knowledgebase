const json2md = require("json2md");
const _merge = require("lodash/merge");

const { DEFAULT_OPTIONS } = require("./constants");
class GoogleDocumentObj {
  constructor({ document, properties = {}, links = {} }) {
    this.document = document;
    this.links = links;
    this.properties = properties;
  }
}

module.exports = {
  GoogleDocumentObj,
};
