const { get } = require("lodash");
const yamljs = require("yamljs");

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

const jekyllifyFrontMatter = (gdoc, markdown) => {
  let { frontMatter: existingFrontMatter, markdownBody } =
    getExistingFrontMatter(markdown);
  const attributeValuePairs = [
    ["title", gdoc.document.title],
    ["description", gdoc.document.description],
    ["short-description", ""],
    ["card-type", "guide-page"],
    ["status", "active"],
    ["display", "true"],
    ["category", "Development"],
    // todo: change below to be dyname
    ["svg", "svg/2FA.svg"],
    ["provider-link", "/guide-pages/how-to-set-reminders-in-slack"],
  ];
  frontMatter = "";
  attributeValuePairs.forEach(([attributeName, value]) => {
    frontMatter += checkFrontMatterAttribute(
      existingFrontMatter,
      attributeName,
      value
    );
  });
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
