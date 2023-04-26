const _merge = require("lodash/merge");

const { DEFAULT_OPTIONS } = require("./constants");
class GoogleDocumentObj {
  constructor({ document, properties = {} }) {
    this.document = document;
    this.properties = properties;
  }
}

module.exports = {
  GoogleDocumentObj,
};
