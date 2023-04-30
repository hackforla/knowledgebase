import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./google/google-drive";
import { fetchGdocCustomProperties } from "./single-gdoc";
import { GdocObj } from "./gdoc-obj";

import { fetchGoogleDocJson } from "./google/google-docs";

export function getSlugsForGdocs(gdocs: any) {
  return gdocs.reduce(
    (acc: any, gdoc: any) => ({ ...acc, [gdoc.id]: gdoc.properties.slug }),
    {}
  );
}

export async function fetchGdocsPropertiesFromTopFolder({
  folder,
  matchpattern,
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

  if (matchpattern) {
    gdocs = gdocs.filter(({ document }: any) => {
      return document.title.toLowerCase().includes(matchpattern.toLowerCase());
    });
  }

  for (let i = 0; i < gdocs.length; i++) {
    gdocs[i] = { id: gdocs[i].id, properties: { ...gdocs[i] } };
  }
  return gdocs;
}

export async function fetchAndSetGdocsContent(gdocs: any) {
  await Promise.all(
    gdocs.map(async (gdoc: GdocObj) => {
      gdoc.content = await fetchGoogleDocJson(gdoc.id);
    })
  );
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

function combineProperties(properties: any, customProperties: any): any {
  return {
    ...properties,
    ...customProperties,
  };
}
