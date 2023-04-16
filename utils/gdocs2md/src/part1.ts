import { DEFAULT_OPTIONS } from "./part1-constants";
import { merge } from "lodash";

import {
  fetchGdocsFromTopFolder,
  getSlugsForGdocs,
  fetchGdocsContent,
} from "./part2";

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
  const links = getSlugsForGdocs(gdocs);
  const gdocsContent = await fetchGdocsContent(gdocs);
  // const gdocsCustomProperties = await fetchCustomProperties(gdocs);
  // gdocs.map((gdoc: any) => gdoc.properties);
  // const gdocsElements = deriveGdocsMdObjs({
  //   gdocs,
  //   gdocsContent,
  //   gdocsCustomProperties,
  //   options,
  //   links,
  // });
  // deriveAndSaveMarkdown(gdocs, options);
};

export { convertGdocs };
