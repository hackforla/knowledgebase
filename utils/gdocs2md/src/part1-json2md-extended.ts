import json2mdExtended from "json2md";
json2mdExtended.converters.footnote = function (footnote: any) {
  return `[^${footnote.number}]:${footnote.text}`;
};

json2mdExtended.converters.html = function (html: any) {
  return html;
};

json2mdExtended.converters.imgextension = (input: any) => {
  if (Array.isArray(input)) {
    return json2mdExtended(input, "");
  }
  const source = input.source || input;
  const markdown = `<img src="${input.targetSource}" title="${input.title}" alt="${input.alt}" height="${input.height}" width="${input.width}">`;
  return markdown;
};

module.exports = json2mdExtended;
