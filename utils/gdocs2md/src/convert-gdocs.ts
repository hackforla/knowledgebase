import { DEFAULT_OPTIONS } from "./constants";
import { merge } from "lodash";

import {
  fetchGdocsPropertiesFromTopFolder,
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
export const convertGdocs = async (customOptions: any) => {
  const options = merge({}, DEFAULT_OPTIONS, customOptions);
  if (!options.folder) {
    throw new Error("Must provide a folder");
  }
  const gdocs = await fetchGdocsPropertiesFromTopFolder(options);
  await fetchAndSetGdocsCustomProperties(gdocs);
  await fetchAndSetGdocsContent(gdocs);
  await convertGdocsArray(gdocs, options);
  // const gdocsElements = deriveGdocsMdObjs({

  // deriveAndSaveMarkdown(gdocs, options);
};

export async function convertGdocsArray(gdocs: any, options: any) {
  for (let i = 0; i < gdocs.length; i++) {
    const gdoc = new GdocObj({
      id: gdocs[i].id,
      properties: gdocs[i].properties,
      content: gdocs[i].content,
    });
    gdocs[i] = gdoc;
  }

  const gdocSlugs = getSlugsForGdocs(gdocs);
  setGdocsElements(gdocs, gdocSlugs, options);
  deriveAndSaveMarkdowns(gdocs, options);
}
