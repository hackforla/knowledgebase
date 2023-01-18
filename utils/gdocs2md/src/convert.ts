import { ElementsOfGoogleDocument } from "./elements-of-google-document";
const json2md = require("json2md");
const { normalizeElement } = require("./normalize-element");

const convertGDoc2ElementsObj = ({ gdoc, options }: any) => {
  const obj = new ElementsOfGoogleDocument({ ...gdoc, options });
  obj.process(options);
  return obj;
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
  const divStart = "";
  const divEnd = "";
  // const divStart = '<div class="section-container" markdown="1">';
  // const divEnd = "</div>";
  let x = 0;
  while (x < markdownLines.length) {
    const line = markdownLines[x];
    if (line.startsWith("## ") && heading1Created) {
      let { counter } = insertElement(markdownLines, x);
      ({ counter } = insertElement(divEnd, counter));
      x = counter;
    }
    if (line.startsWith("## ")) {
      let { counter } = insertElement(divStart, x);
      ({ counter } = insertElement(markdownLines, counter));
      x = counter;
      heading1Created = true;
    }
    x++;
  }
  if (heading1Created) {
    // markdownLines.push(divEnd);
  }
  return markdownLines.join("\n");
};

const insertElement = (elements: any, x: any) => {
  let newLines = Array.isArray(elements) ? [...elements] : [elements];
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
  convertGDoc2ElementsObj,
  formatHeading2MarkdownSections,
  removeBlankLines,
};
