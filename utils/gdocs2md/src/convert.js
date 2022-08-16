const { ElementsOfGoogleDocument } = require("./elements-of-google-document");
const json2md = require("json2md");
const { normalizeElement } = require("./normalize-element");

const convertGDoc2ElementsObj = (gDoc) => {
  const obj = new ElementsOfGoogleDocument({ ...gDoc });
  obj.process();
  return obj;
};

const convertElements2MD = (elements) => {
  const json = elements.map(normalizeElement);
  return json2md(json);
};

const addHeading2MarkdownAnchor = (markdown) => {
  const lines = markdown.split("\n");
  const addedLinesCount = 0;
  const linesCopy = [...lines];
  linesCopy.forEach((line, index) => {
    if (line.startsWith("## ")) {
      const text = line.substring(3).replace(" ", "-");
      const anch = `<a name="${text}"></a>`;
      lines.splice(index + addedLinesCount, 0, anch);
      addedLinesCount++;
    }
  });
};

const formatHeading2MarkdownSection = (markdown) => {
  const lines = markdown.split("\n");
  const addedLinesCount = 0;
  const heading2Created = false;
  const linesCopy = [...lines];
  linesCopy.forEach((line, index) => {
    if (line.startsWith("## ")) {
      if (heading2Created) {
        lines.splice(index + addedLinesCount - 1, 0, "/n</div>/n");
        addedLinesCount++;
      } else {
        heading2Created = true;
      }
      const divStart = '\n<div class="section"><span />\n';
      lines.splice(index + addedLinesCount - 1, 0, divStart);
      addedLinesCount++;
      if (index === linesCopy.length - 1 && heading2Created) {
        lines.splice(index + addedLinesCount, 0, "/n</div>/n");
        addedLinesCount++;
      }
    }
  });
};

module.exports = {
  addHeading2MarkdownAnchor,
  formatHeading2MarkdownSection,
  convertGDoc2ElementsObj,
  convertElements2MD,
};
