// async function deriveAndSaveMarkdown({ gdoc, options, links = {} }: any) {
//   const gdocWithElements = convertGDoc2ElementsObj({ gdoc, options, links });
//   const { filename, markdown, phase_name } = await getMarkdownPlus({
//     gdocWithElements,
//     options,
//   });
//   return { filename, markdown, phase_name };
// }

// function getLinks(gdocsProperties) {
//   return gdocsProperties.reduce(
//     (acc, gdoc) => ({ ...acc, [gdoc.id]: gdoc.slug }),
//     {}
//   );
const {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} = require("../../googleoauth2-utils/src/google-drive.js");

async function fetchGdocsFromTopFolder({ folder, matchPattern }: any) {
  console.log("fetchGdocsFromTopFolder", folder, matchPattern);
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

// async function fetchGdocsContent(gdocProperties: any) {
//   const gdocConent = await Promise.all(
//     gdocProperties.map(async (gdocProperties) => {
//       return await fetchGoogleDocJson(gdocProperties.id);
//     })
//   );

//   return gdocs;
// }

export { fetchGdocsFromTopFolder };
