const { get } = require("lodash");
const yamljs = require("yamljs");
const axios = require("axios");

const getExistingFrontMatter = (markdown) => {
  const startPos = markdown.indexOf("---");
  if (startPos === -1) {
    return { frontMatter: "", markdownBody: markdown };
  }
  const endPos = markdown.indexOf("\n---", startPos + 3);
  if (endPos === -1) {
    return { frontMatter: "", markdownBody: markdown };
  }
  let frontMatter = markdown.substring(startPos + 4, endPos) + "\n";
  let markdownBody = markdown.substring(endPos + 4, markdown.length);
  return { frontMatter, markdownBody };
};

const checkFrontMatterAttribute = (
  existingFrontMatter,
  attributeName,
  value
) => {
  return !existingFrontMatter.includes(attributeName + ":")
    ? `${attributeName}: ${value}\n`
    : "";
};

const jekyllifyFrontMatter = async (gdoc, markdown) => {
  let { frontMatter: existingFrontMatter, markdownBody } =
    getExistingFrontMatter(markdown);
  // todo: consider making this into a separate method, inject function for generating front matter
  // const attributeValuePairs = [
  //   ["title", gdoc.document.title],
  //   ["description", gdoc.document.description || ""],
  //   ["short-description", ""],
  //   ["card-type", "guide-page"],
  //   ["status", "active"],
  //   ["display", "true"],
  //   ["category", "Development"],
  //   // todo: change below to be dyname
  //   ["svg", "svg/2FA.svg"],
  //   ["provider-link", gdoc.properties.slug + gdoc.options.suffix],
  // ];
  // attributeValuePairs.forEach(([attributeName, value]) => {
  // frontMatter += checkFrontMatterAttribute(
  //   existingFrontMatter,
  //   attributeName,
  //   value

  const defaultData = {
    title: gdoc.document.title,
    description: gdoc.document.description || "",
    "short-description": "",
    "card-type": "guide-page",
    status: "active",
    display: "true",
    category: "Development",
    // todo: change below to be dynamic
    svg: "svg/2FA.svg",
    "provider-link": gdoc.properties.slug + gdoc.options.suffix,
  };
  frontMatter = "";
  // todo: change below to be dynamic
  const url = `http://localhost:8000/gdocs/get/${gdoc.document.documentId}`;
  console.log("Getting metadata", gdoc.document.title, url);
  let dataJson = {};
  try {
    response = await axios({
      url,
      method: "GET",
    });
    dataJson = response.data;
    const messageStart =
      Object.keys(dataJson).length === 0 ? "No data" : "Data";
    console.log(`${messageStart} found for ${gdoc.document.title}`);
  } catch (error) {
    // todo: not connected, replicate and handle [index] error, table error
    console.log(
      "*** Error ***",
      error.stack?.substring(0, 150) || error.message || error
    );
  }
  const json = { ...defaultData, ...dataJson };
  for (key in json) {
    frontMatter += `${key}: ${json[key]}\n`;
  }

  // todo: return retVal and on receiving side, use it to update the frontmatter
  return "---\n" + frontMatter + existingFrontMatter + "---\n" + markdownBody;
};

const getFrontMatterFromGdoc = (gdoc) => {
  const frontMatter = {
    ...gdoc.properties,
    ...(gdoc.cover ? { cover: gdoc.cover } : {}),
  };
  const markdownFrontmatter =
    Object.keys(frontMatter).length > 0
      ? `---\n${yamljs.stringify(frontMatter)}---\n`
      : "";
  return markdownFrontmatter;
};

module.exports = { getFrontMatterFromGdoc, jekyllifyFrontMatter };
