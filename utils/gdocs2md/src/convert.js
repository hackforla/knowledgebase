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
  let addedLinesCount = 0;
  const linesCopy = [...lines];
  linesCopy.forEach((line, index) => {
    if (line.startsWith("## ")) {
      const text = line.substring(3).replace(" ", "-");
      const anch = `<a name="${text}"></a>`;
      lines.splice(index + addedLinesCount, 0, anch, "");
      addedLinesCount += 2;
    }
  });
  return lines.join("\n");
};

const formatHeading2MarkdownSections = (markdown) => {
  let markdownLines = markdown.split("\n");
  let heading1Created = false;
  const divStart = '<div class="section-container" markdown="1">';
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

const removeBlankLines = (elements) => {
  foundBeginning = false;
  countTripleDashes = 0;
  while (elements.length < x && !foundBeginning) {
    while (elements[x].trim() === "") {
      elements.splice(x, 1);
    }
    element = elements[x];
    if (element === "---") {
      countTripleDashes++;
    }
    if (countTripleDashes === 2 || countTripleDashes === 0) {
      foundBeginning = true;
    }
  }
  return markdown.replace(/\n\n/g, "\n");
};

module.exports = {
  addHeading2MarkdownAnchor,
  convertElements2MD,
  convertGDoc2ElementsObj,
  formatHeading2MarkdownSection: formatHeading2MarkdownSections,
};
