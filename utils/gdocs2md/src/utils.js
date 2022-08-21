const { get } = require("lodash");
const yamljs = require("yamljs");

const getExistingFrontMatter = (markdown) => {
  console.log("markdown", markdown);
  const startPos = markdown.indexOf("\n---");
  if (startPos === -1) {
    return { frontMatter: "", markdownBody: markdown };
  }
  const endPos = markdown.indexOf("\n---", startPos + 3);
  if (endPos === -1) {
    return { frontMatter: "", markdownBody: markdown };
  }
  let frontMatter = markdown.substring(startPos + 3, endPos);
  let markdownBody = markdown.substring(endPos + 5);
  return { frontMatter, markdownBody };
};

const checkFrontMatterAttribute = (
  gdoc,
  existingFrontMatter,
  attributeName,
  value
) => {
  return !existingFrontMatter.includes(attributeName + ":")
    ? existingFrontMatter + `\n${attributeName}: ${value}\n`
    : "";
};

const jekyllifyFrontMatter = (gdoc, markdown) => {
  let { frontMatter: existingFrontMatter, markdownBody } =
    getExistingFrontMatter(markdown);
  // TODO: using target, calculate targetImage and targetImageAlt
  // const fileName = replace("properties.title" || "untitled", " ", "-");
  // const targetImage = '"assetsimages/' + fileName + ".png";
  // const imageName =  fs.existsSync(`${targetImage}`) ? targetImage : '"svg/
  const attributeValuePairs = [
    ["title", gdoc.title],
    ["description", gdoc.description],
    ["short-description", ""],
    ["card-type", "guide-page"],
    ["status", "active"],
    ["display", "true"],
    ["category", "Development"],
    // todo: change below to be dyname
    [" svg", "svg/2FA.svg"],
    [" provider-link", "/guide-pages/2FA"],
  ];
  frontMatter = "";
  attributeValuePairs.forEach(([attributeName, value]) => {
    frontMatter += checkFrontMatterAttribute(
      gdoc,
      existingFrontMatter,
      attributeName,
      value
    );
  });
  return "---\n" + frontMatter + "---\n" + markdownBody;
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
