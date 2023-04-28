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
import { writeContentToFile } from "./save-or-write";

/**
 * Based on the options, filter google docs from specified folder and process them,
 * with final product being markdown files
 * @param {*} customOptions
 */

export async function convertGdocs(customOptions: any) {
  const options = merge({}, DEFAULT_OPTIONS, customOptions);
  if (!options.folder) {
    throw new Error("Must provide a folder");
  }
  const gdocs = await fetchGdocs(options);
  await fetchAndSetGdocsCustomProperties(gdocs);
  await processGdocsArray(gdocs, options);
  await deriveAndSaveMarkdowns(gdocs, options);
}

export async function fetchGdocs(customOptions: any) {
  const options = merge({}, DEFAULT_OPTIONS, customOptions);
  const gdocs = await fetchGdocsPropertiesFromTopFolder(options);
  await fetchAndSetGdocsContent(gdocs);
  return gdocs;
}

export async function saveElements(options: any) {
  const gdocs = await fetchGdocs(options);
  for (const gdoc of gdocs) {
    const gdocObj = new GdocObj(gdoc);
    gdocObj.setElements({}, options);
    options.filename = gdocObj.properties.name;
    options.content = JSON.stringify(gdocObj.elements);
    await writeContentToFile(options);
  }
}

export function processDeriveAndSaveMarkdowns(gdocs: any, options: any) {
  processGdocsArray(gdocs, options);
  deriveAndSaveMarkdowns(gdocs, options);
}
export async function processGdocsArray(gdocs: any, options: any) {
  convertGdocsToObjs(gdocs);
  const gdocSlugs = getSlugsForGdocs(gdocs);
  setGdocsElements(gdocs, gdocSlugs, options);
}

function convertGdocsToObjs(gdocs: any) {
  for (let i = 0; i < gdocs.length; i++) {
    const gdoc = new GdocObj({
      id: gdocs[i].id,
      properties: gdocs[i].properties,
      content: gdocs[i].content,
    });
    gdocs[i] = gdoc;
  }
}

export async function saveGdocs(options: any) {
  const gdocs = await fetchGdocs(options);
  for (const gdoc of gdocs) {
    writeContentToFile({
      filename: gdoc.properties.name,
      content: JSON.stringify(gdoc),
    });
  }
}
