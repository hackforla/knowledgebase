import { ElementsOfGoogleDocument } from "./elements-of-google-document";
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
type arrayTypeHash = {
  array: any[];
  keyProperty: string;
  valueProperty?: string;
  hashProperty?: string;
};
function arrayToHash({ array, keyProperty }: arrayTypeHash) {
  const hash = {} as any;
  array.forEach((item) => {
    const key = item[keyProperty];
    hash[key] = item;
  });
  return hash;
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

async function fetchAndSetContent(gdocObjs: any) {
  const keys = Object.keys(gdocObjs);
  await Promise.all(
    keys.map(async (key) => {
      const content = await fetchGoogleDocJson(key);
      gdocObjs[key].content = content;
    })
  );
}

export {
  arrayToHash,
  fetchGdocsFromTopFolder,
  getSlugsForGdocs,
  fetchAndSetContent,
};
