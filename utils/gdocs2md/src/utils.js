const yamljs = require("yamljs");
const axios = require("axios");

async function getData(documentId, title) {
  const url = `http://localhost:8000/gdocs/get/${documentId}`;
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

const getFrontMatter = ({ gdoc, jsonData }) => {
  const isActive = jsonData.active || jsonData.active === undefined;
  gdoc.properties.status = isActive ? "active" : "inactive";
  // todo: all hard coded scripts should be dynamic
  const frontmatterJson = {
    title: jsonData.title || gdoc.document.title,
    description: jsonData.description || gdoc.document.description || "",
    "short-description": jsonData.short_description || "",
    "card-type": jsonData.card_type || "guide-page",
    status: jsonData.status || "active",
    display: "true",
    "provider-link": gdoc.properties.slug + gdoc.options.suffix,
    phase: jsonData.phase || "dev",
    svg: jsonData.svg || "svg/2FA.svg",
  };

  const attributeValuePairs = [
    ["title", frontmatterJson.title],
    ["description", frontmatterJson.description || ""],
    ["short-description", frontmatterJson.short_description, ""],
    ["card-type", frontmatterJson.card_type || "guide-page"],
    ["status", "active"],
    ["display", "true"],
    ["phase", "pending"],
    // todo: change below to be dyname
    ["svg", "svg/2FA.svg"],
    ["provider-link", gdoc.properties.slug + gdoc.options.suffix],
    ["cover", gdoc.cover || false],
  ];
  let frontMatter = "";
  attributeValuePairs.forEach(([attributeName, value]) => {
    frontMatter += checkFrontMatterAttribute(attributeName, value);
  });

  return `---\n${frontMatter}---\n`;
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

const checkFrontMatterAttribute = (attributeName, value) => {
  return `${attributeName}: ${value || ""}\n`;
};

module.exports = { getFrontMatter, getData };
