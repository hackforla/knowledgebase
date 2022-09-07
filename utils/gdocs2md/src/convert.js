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

const removeBlankLines = (markdown) => {
  let reachedEnd = false;
  let countTripleDashes = 0;
  let index = 0;
  let markdownLines = markdown.split("\n");

  console.log("starting removeBlankLines");
  while (index < markdownLines.length && !reachedEnd) {
    console.log("top of while loop", reachedEnd);
    while (
      markdownLines[index] != undefined &&
      markdownLines[index].trim() === ""
    ) {
      console.log("removing blank line");
      markdownLines.splice(index, 1);
    }
    console.log("regular line");
    element = markdownLines[index];
    if (element === "---") {
      countTripleDashes++;
    }
    reachedEnd = countTripleDashes === 2 || countTripleDashes === 0;

    index++;
  }
  console.log("tripledashes b", countTripleDashes);
  return markdownLines.join("\n");
};

module.exports = {
  convertElements2MD,
  convertGDoc2ElementsObj,
  formatHeading2MarkdownSections,
  removeBlankLines,
};
