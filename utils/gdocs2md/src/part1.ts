const { DEFAULT_OPTIONS } = require("./constants");
const { merge } = require("lodash");
const { fetchGdocsFromTopFolder } = require("./part2");

/**
 * Based on the options, filter google docs from specified folder and process them,
 * with final product being markdown files
 * @param {*} customOptions
 */
const convertGdocs = async (customOptions: any) => {
  console.log("jekyllifyDocs start");
  // todo: extract to a function
  const options = merge({}, DEFAULT_OPTIONS, customOptions);
  if (!options.folder) {
    throw new Error("Must provide a folder");
  }
  const gdocs = await fetchGdocsFromTopFolder(options);
  // const links = getLinksFromGdocs(gdocs);
  // const gdocsContent = await fetchGdocsContent(gdocs);
  // const gdocsElements = deriveElements(gdocsContent, options, links)
  // deriveAndSaveMarkdown(gdocs, options);
  console.log(JSON.stringify(gdocs));
};

export { convertGdocs };
