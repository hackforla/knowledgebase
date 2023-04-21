const json2mdExtended = require("json2md");
json2mdExtended.converters.footnote = function (footnote) {
  return `[^${footnote.number}]:${footnote.text}`;
};

json2mdExtended.converters.html = function (html) {
  return html;
};

json2mdExtended.converters.imgextension = (input) => {
  if (Array.isArray(input)) {
    return json2mdextended(input, "", "imgextension");
  }
  const source = input.source || input;
  const markdown = `<img src="${input.targetSource}" title="${input.title}" alt="${input.alt}" height="${input.height}" width="${input.width}">`;
  return markdown;
};

module.exports = json2mdExtended;
