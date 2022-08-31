const json2md = require("json2md");
const _merge = require("lodash/merge");

const { DEFAULT_OPTIONS } = require("./constants");

const HORIZONTAL_TAB_CHAR = "\x09";
const GOOGLE_DOCS_INDENT = 18;

class GoogleDocumentObj {
  constructor({ document, properties = {}, options = {}, links = {} }) {
    this.document = document;
    this.links = links;
    this.properties = properties;
    this.options = _merge({}, DEFAULT_OPTIONS, options);
  }
}

module.exports = {
  GoogleDocumentObj,
};
