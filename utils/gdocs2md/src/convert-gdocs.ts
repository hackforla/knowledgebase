import { DEFAULT_OPTIONS } from "./constants";
import { merge } from "lodash";

import {
  fetchGdocsFromTopFolder,
  fetchAndSetGdocsContent,
  deriveAndSaveMarkdowns,
  fetchAndSetGdocsCustomProperties,
  setGdocsElements,
  getSlugsForGdocs,
} from "./multi-gdocs";
import { GdocObj } from "./gdoc-obj";

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

  for (let i = 0; i < gdocs.length; i++) {
    const gdoc = new GdocObj({ id: gdocs[i].id });
    gdoc.properties = { ...gdocs[i] };
    gdocs[i] = gdoc;
  }

  const gdocSlugs = getSlugsForGdocs(gdocs);

  await fetchAndSetGdocsContent(gdocs);
  await fetchAndSetGdocsCustomProperties(gdocs);
  setGdocsElements(gdocs, gdocSlugs, options);
  deriveAndSaveMarkdowns(gdocs, options);
  // const gdocsElements = deriveGdocsMdObjs({

  // deriveAndSaveMarkdown(gdocs, options);
};

export { convertGdocs };
