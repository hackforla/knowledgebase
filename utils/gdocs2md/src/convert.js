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

const formatHeading2MarkdownSections = (markdown) => {
  let markdownLines = markdown.split("\n");
  let heading1Created = false;
  const divStart = '<div class="section-container"><span />';
  const divEnd = "</div>";
  let x = 0;
  while (x < markdownLines.length) {
    const line = markdownLines[x];
    if (line.startsWith("## ") && heading1Created) {
      let { counter } = insertElement(markdownLines, divEnd, x);
      x = counter;
    }
    if (line.startsWith("## ")) {
      let { counter } = insertElement(markdownLines, divStart, x);
      x = counter;
      heading1Created = true;
    }
    x++;
  }
  if (heading1Created) {
    markdownLines.push(divEnd);
  }
  return markdownLines.join("\n");
};

const insertElement = (elements, element, x) => {
  let newLines = Array.isArray(element) ? [...element] : [element];
  newLines = elements[x - 1] ? ["", ...newLines, ""] : [...newLines, ""];
  elements.splice(x, 0, ...newLines);
  return { counter: x + newLines.length };
};

module.exports = {
  addHeading2MarkdownAnchor,
  formatHeading2MarkdownSection: formatHeading2MarkdownSections,
  convertGDoc2ElementsObj,
  convertElements2MD,
};
