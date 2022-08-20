const yamljs = require("yamljs");

const getFrontMatterFromGdoc = (gdoc) => {
  const frontmatter = {
    ...gdoc.properties,
    ...(gdoc.cover ? { cover: gdoc.cover } : {}),
  };
  const markdownFrontmatter =
    Object.keys(frontmatter).length > 0
      ? `---\n${yamljs.stringify(frontmatter)}---\n`
      : "";
  return markdownFrontmatter;
};

module.exports = { getFrontMatterFromGdoc };
