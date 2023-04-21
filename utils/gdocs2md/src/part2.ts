import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./google/part1-google-funcs";
import { deriveMarkdown, getFrontMatter } from "./single-gdoc";
import { GdocObj } from "./part1-gdoc-obj";
import { fetchGdocCustomProperties } from "./single-gdoc";
import { writeMarkdown } from "./part1-write";

import { fetchGoogleDocJson } from "./google/part1-google-docs-funcs";

import {} from "./single-gdoc";

function getSlugsForGdocs(gdocs: any) {
  return gdocs.reduce(
    (acc: any, gdoc: any) => ({ ...acc, [gdoc.id]: gdoc.properties.slug }),
    {}
  );
}

async function fetchGdocsFromTopFolder({ folder, matchPattern }: any) {
  const drive = await getGoogleDriveApi();
  const topFolderInfo = await drive.files.get({
    fileId: folder,
    fields: "name,description", // name is for debugging
    supportsAllDrives: true,
  });
  let gdocs = await fetchFromSubfolders({
    drive,
    parents: [
      {
        id: folder,
        tree: [],
        metadata: getMetadataFromDescription(topFolderInfo.data.description),
      },
    ],
    folder,
  });

  if (matchPattern) {
    gdocs = gdocs.filter(({ document }: any) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }
  return gdocs;
}

async function fetchAndSetGdocsContent(gdocs: any) {
  await Promise.all(
    gdocs.map(async (gdoc: GdocObj) => {
      gdoc.content = await fetchGoogleDocJson(gdoc.id);
    })
  );
}

async function deriveAndSaveMarkdowns(gdocs: GdocObj[], options: any) {
  console.log("options", options);
  await Promise.all(
    gdocs.map(async (gdoc) => {
      if (options.saveMarkdownToFile) {
        const { filename, markdown, phase_name } = deriveMarkdown(
          gdoc,
          options
        );
        console.log(
          "filename",
          filename,
          "markdown",
          markdown,
          "phase_name",
          phase_name
        );
        await writeMarkdown(options, filename, markdown);
      }
    })
  );
}

export function setGdocsElements(gdocs: any, gdocSlugs: any, options: any) {
  gdocs.forEach((gdoc: GdocObj) => {
    gdoc.setElements(gdocSlugs, options);
    console.log("elements", gdoc.elements);
  });
}

export async function fetchAndSetGdocsCustomProperties(gdocs: GdocObj[]) {
  gdocs.map(async (gdoc) => {
    const customProperties = await fetchGdocCustomProperties(
      gdoc.id,
      gdoc.properties.name
    );
    gdoc.properties = combineProperties(gdoc.properties, customProperties);
  });
}

export {
  deriveMarkdown,
  fetchAndSetGdocsContent,
  fetchGdocsFromTopFolder,
  getSlugsForGdocs,
  deriveAndSaveMarkdowns,
  getFrontMatter,
};
function combineProperties(properties: any, customProperties: any): any {
  return {
    ...properties,
    ...customProperties,
  };
}
