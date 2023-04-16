import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./google-drive";

const {
  fetchGoogleDocJson,
} = require("../../googleoauth2-utils/src/google-docs.js");

// async function deriveAndSaveMarkdown({ gdoc, options, links = {} }: any) {
//   const gdocWithElements = convertGDoc2ElementsObj({ gdoc, options, links });
//   const { filename, markdown, phase_name } = await getMarkdownPlus({
//     gdocWithElements,
//     options,
//   });
//   return { filename, markdown, phase_name };
// }

function arrayToHash(array: any, keyField: string, valueField?: string) {
  return array.reduce(
    (acc: any, item: any) => ({
      ...acc,
      [item["id"]]: valueField ? item[valueField] : item,
    }),
    {}
  );
}

function getSlugsForGdocs(gdocsProperties: any) {
  return gdocsProperties.reduce(
    (acc: any, gdoc: any) => ({ ...acc, [gdoc.id]: gdoc.slug }),
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

async function fetchGdocsContent(gdocIds: any) {
  const gdocsContent = await Promise.all(
    gdocIds.map(async (gdoc: any) => {
      return await fetchGoogleDocJson(gdoc.id);
    })
  );
  const hash = arrayToHash(gdocsContent, "id");
  console.log(hash[gdocsContent[0].id]);
  return hash;
}

export { fetchGdocsFromTopFolder, getSlugsForGdocs, fetchGdocsContent };
