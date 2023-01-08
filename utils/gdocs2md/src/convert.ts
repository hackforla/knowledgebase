import { ElementsOfGoogleDocument } from "./elements-of-google-document";
const json2md = require("json2md");
const { normalizeElement } = require("./normalize-element");

const convertGDoc2ElementsObj = (gdoc: any, options: any) => {
  const obj = new ElementsOfGoogleDocument({ ...gdoc });
  obj.process(options);
  return obj;
};

const convertElements2MD = (elements: any) => {
  const json = elements.map(normalizeElement);
  let markdown = json2md(json);
  markdown =
    '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
    markdown +
    "</div>\n</div>";
  return removeBlankLines(markdown);
};

// const addHeading2MarkdownAnchor = (markdown) => {
//   const lines = markdown.split("\n");
//   let addedLinesCount = 0;
//   const linesCopy = [...lines];
//   linesCopy.forEach((line, index) => {
//     if (line.startsWith("## ")) {
//       const text = line.substring(3).replace(" ", "-");
//       const anch = `<a name="${text}"></a>`;
//       lines.splice(index + addedLinesCount, 0, anch, "");
//       addedLinesCount += 2;
//     }
//   });
//   return lines.join("\n");
// };

const formatHeading2MarkdownSections = (markdown: string) => {
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

const insertElement = (elements: any, element: any, x: any) => {
  let newLines = Array.isArray(element) ? [...element] : [element];
  newLines = elements[x - 1] ? ["", ...newLines, ""] : [...newLines, ""];
  elements.splice(x, 0, ...newLines);
  return { counter: x + newLines.length };
};

const removeBlankLines = (markdown: string) => {
  let reachedEnd = false;
  let countTripleDashes = 0;
  let index = 0;
  let markdownLines = markdown.split("\n");

  while (index < markdownLines.length && !reachedEnd) {
    while (
      markdownLines[index] != undefined &&
      markdownLines[index].trim() === ""
    ) {
      markdownLines.splice(index, 1);
    }
    const element = markdownLines[index];
    if (element === "---") {
      countTripleDashes++;
    }
    reachedEnd = countTripleDashes === 2 || countTripleDashes === 0;

    index++;
  }
  return markdownLines.join("\n");
};

module.exports = {
  convertElements2MD,
  convertGDoc2ElementsObj,
  formatHeading2MarkdownSections,
  removeBlankLines,
};
