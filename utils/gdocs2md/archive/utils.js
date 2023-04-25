const axios = require("axios");
const path = require("path");

async function getData(id, title) {
  const url = `http://localhost:8000/gdocs/get/${id}`;
  const response = await axios({
    url,
    method: "GET",
  }).catch((error) => {
    console.log("error", JSON.stringify(error));
    console.log(title, id, "not registered");
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

const getFrontMatter = ({ gdoc, jsonData }, options) => {
  const metaData = jsonData || {};
  const isActive = metaData.active || metaData.active === undefined;
  gdoc.properties.status = isActive ? "active" : "inactive";
  // todo: all hard coded scripts should be dynamic
  const frontmatterJson = {
    title: metaData.title || gdoc.document.title,
    description: metaData.description || gdoc.document.description || "",
    "short-description": metaData.short_description || "",
    "card-type": metaData.card_type || "guide-page",
    status: metaData.status || "active",
    display: "true",
    "provider-link": gdoc.properties.slug + (options.suffix || ""),
    phase: metaData.phase || "dev",
    svg: metaData.svg || "svg/2FA.svg",
  };

  const attributeValuePairs = [
    ["title", frontmatterJson.title],
    ["description", frontmatterJson.description || ""],
    ["short-description", frontmatterJson.short_description, ""],
    ["card-type", frontmatterJson.card_type || "guide-page"],
    ["status", "active"],
    ["display", true],
    ["category", frontmatterJson.category || "Development"],
    // ["phase", "pending"],
    // todo: change below to be dyname
    ["svg", "svg/2FA.svg"],
    ["provider-link", gdoc.properties.slug + (options.suffix || "")],
    gdoc.cover ? ["cover", gdoc.cover] : [],
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
  if (!attributeName) {
    return "";
  }
  return `${attributeName}: ${value || ""}\n`;
};

function getPluginOptions({
  folderId,
  root,
  subdir,
  suffix,
  saveGdoc,
  saveMarkdownToFile,
}) {
  return {
    folder: folderId,
    markdownDir: path.join(root, subdir || ""),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    saveMarkdownToFile,
  };
}
module.exports = { getFrontMatter, getData, getPluginOptions };
