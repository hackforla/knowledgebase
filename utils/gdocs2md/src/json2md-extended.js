const json2mdExtended = require("json2md");
json2mdExtended.converters.footnote = function (footnote) {
  return `[^${footnote.number}]:${footnote.text}`;
};

json2mdExtended.converters.imgkramdown = (input, json2md) => {
  if (Array.isArray(input)) {
    return json2md(input, "", "imgkramdown");
  }
  const source = input.source || input;
  const title = input.title || "";
  const alt = input.alt || "";
  const kramdownForSize =
    input.height && input.width
      ? `{:height: ${input.height} width: ${input.width}}`
      : "";
  const markdown = `![${alt}](${source} "${title}")${kramdownForSize}`;
  return markdown;
};

module.exports = json2mdExtended;
