import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./google/google-drive";
import {
  fetchGdocCustomProperties,
  deriveMarkdown,
  getFrontMatter,
} from "./single-gdoc";
import { GdocObj } from "./gdoc-obj";
import { saveMarkdown } from "./save-or-write";

import { fetchGoogleDocJson } from "./google/google-docs";

function getSlugsForGdocs(gdocs: any) {
  return gdocs.reduce(
    (acc: any, gdoc: any) => ({ ...acc, [gdoc.id]: gdoc.properties.slug }),
    {}
  );
}

async function fetchGdocsPropertiesFromTopFolder({
  folder,
  matchPattern,
}: any) {
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

  for (let i = 0; i < gdocs.length; i++) {
    gdocs[i] = { id: gdocs[i].id, properties: { ...gdocs[i] } };
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
  for (let i = 0; i < gdocs.length; i++) {
    // DO NOT USE MAP OR FOREACH HERE: will not wait for async function to finish
    const { filename, markdown, phase_name } = deriveMarkdown(
      gdocs[i],
      options
    );
    console.log("filename is", filename, "phase_name", phase_name);
    await saveMarkdown(filename, options, markdown, phase_name);
  }
}

export function setGdocsElements(gdocs: any, gdocSlugs: any, options: any) {
  gdocs.forEach((gdoc: GdocObj) => {
    gdoc.setElements(gdocSlugs, options);
    console.log("set elements", gdoc.id);
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
  fetchGdocsPropertiesFromTopFolder,
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
