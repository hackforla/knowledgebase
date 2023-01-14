const yamljs = require("yamljs");
const axios = require("axios");

async function getData(documentId, title) {
  const url = `http://localhost:8000/gdocs/get/${documentId}`;
  console.log("Getting metadata", title, url);
  const response = await axios({
    url,
    method: "GET",
  }).catch((error) => {
    console.log("error", JSON.stringify(error));
    console.log(title, documentId, "not registered");
    return {};
  });
  const response2 = response;
  return response2.data || {};
}

/**
 * Compare the frontmatter in the gdoc with default frontmatter and return frontmatter
 * merged with markdown
 * @param {*} gdoc
 * @param {*} markdown
 * @returns
 */
const objectToJson = (object) => {
  return JSON.parse(JSON.stringify(object));
};

const getFrontMatter = (gdocProperties, cover) => {
  gdocProperties.status = gdocProperties.active ? "active" : "inactive";
  console.log("debug gdocProperties", gdocProperties);
  coverProperty = cover ? { cover } : {};
  properties = { ...objectToJson(gdocProperties), coverProperty };
  console.log("debug properties", properties);
  console.log(
    "debug yamljs.stringify(properties)",
    yamljs.stringify(properties)
  );

  const markdownFrontmatter =
    Object.keys(gdocProperties).length > 0
      ? `---\n${yamljs.stringify(properties)}---\n`
      : "";
  console.log("debug markdownFrontmatter", markdownFrontmatter);
  return markdownFrontmatter;
};

// const getExistingFrontMatter = (markdown) => {
//   const startPos = markdown.indexOf("---");
//   if (startPos === -1) {
//     return { frontMatter: "", markdownBody: markdown };
//   }
//   const endPos = markdown.indexOf("\n---", startPos + 3);
//   if (endPos === -1) {
//     return { frontMatter: "", markdownBody: markdown };
//   }
//   let frontMatter = markdown.substring(startPos + 4, endPos) + "\n";
//   let markdownBody = markdown.substring(endPos + 4, markdown.length);
//   return { frontMatter, markdownBody };
// };

// todo: consider making this into a separate method, inject function for generating front matter
// const attributeValuePairs = [
//   ["title", gdoc.document.title],
//   ["description", gdoc.document.description || ""],
//   ["short-description", ""],
//   ["card-type", "guide-page"],
//   ["status", "active"],
//   ["display", "true"],
//   ["phase", "Development"],
//   // todo: change below to be dyname
//   ["svg", "svg/2FA.svg"],
//   ["provider-link", gdoc.properties.slug + gdoc.options.suffix],
// ];
// attributeValuePairs.forEach(([attributeName, value]) => {
// frontMatter += checkFrontMatterAttribute(
//   existingFrontMatter,
//   attributeName,
//   value
// return "---\n" + frontMatter + existingFrontMatter + "---\n" + markdownBody;

// const checkFrontMatterAttribute = (
//   existingFrontMatter,
//   attributeName,
//   value
// ) => {
//   return !existingFrontMatter.includes(attributeName + ":")
//     ? `${attributeName}: ${value}\n`
//     : "";
// };

module.exports = { getFrontMatter, getData };
