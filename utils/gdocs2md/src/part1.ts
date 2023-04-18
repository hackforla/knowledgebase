import { DEFAULT_OPTIONS } from "./part1-constants";
import { merge } from "lodash";

import {
  arrayToHash,
  fetchGdocsFromTopFolder,
  getSlugsForGdocs,
  fetchAndSetContent,
} from "./part2";
import { GdocObj } from "./part1-gdoc-obj";

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
    console.log("gdoc loop", gdoc.process);
    gdoc.properties = { ...gdocs[i] };
    gdocs[i] = gdoc;
  }
  console.log("a", gdocs[0].process);

  const gdocObjs = arrayToHash({
    array: gdocs,
    keyProperty: "id",
  });
  await fetchAndSetContent(gdocObjs);
  // await fetchAndSetCustomProperties(gdocObjs);
  const gdocObjsValues = Object.values(gdocObjs) as GdocObj[];
  gdocObjsValues.forEach((gdoc: GdocObj) => {
    gdoc.process();
    console.log("elements", gdoc.elements);
  });
  // const gdocsElements = deriveGdocsMdObjs({
  //   gdocObjs,
  //   options,
  //   links,
  // });
  // deriveAndSaveMarkdown(gdocs, options);
};

export { convertGdocs };
