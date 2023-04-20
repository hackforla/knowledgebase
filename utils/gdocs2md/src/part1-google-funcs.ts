import { google } from "googleapis";
import _kebabCase from "lodash/kebabCase";
import _chunk from "lodash/chunk";
import _flatten from "lodash/flatten";
import yamljs from "yamljs";

import { wait } from "./part1-wait";
import { getAuth } from "./part1-google-auth";

const MIME_TYPE_DOCUMENT = "application/vnd.google-apps.document";
const MIME_TYPE_FOLDER = "application/vnd.google-apps.folder";

/**
 * @template T
 * @param {T[]} arr
 * @param {number} count
 * @returns {T[][]}
 */
function evenlyChunk(arr: string | any[], count: number) {
  const chunks = Math.ceil(arr.length / count);
  if (chunks <= 1) {
    return [arr];
  }
  return _chunk(arr, Math.ceil(arr.length / chunks));
}

const getMetadataFromDescription = (description: any) => {
  const metadata = {} as { skip?: boolean };

  if (description) {
    try {
      // Try to convert description from YAML
      const descriptionObject = yamljs.parse(description);
      if (typeof descriptionObject !== "string") {
        Object.assign(metadata, descriptionObject);
      }
    } catch (e) {
      // Description field is not valid YAML
      // Do not throw an error
    }
  }

  return metadata;
};

const getTreeMetadata = (
  folderTree: any[],
  file: { name: string; index: any; slug: string }
) => {
  let name = file.name;
  let breadcrumb: { name: any; slug: string }[] = [];
  let slug = "";
  let path = "";

  folderTree.forEach((folder: { name: any; skip: boolean }) => {
    const nameSlugified = _kebabCase(folder.name);

    path += `/${folder.name}`;

    if (folder.skip !== true) {
      slug += `/${nameSlugified}`;
      breadcrumb.push({
        name: folder.name,
        slug,
      });
    }
  });

  // /folder/index -> /folder
  if (file.index) {
    const folder = breadcrumb.pop();
    if (folder && file.name === "index") {
      name = folder.name;
    }
  } else {
    const nameSlugified = _kebabCase(name);

    path += `/${nameSlugified}`;
    slug += `/${nameSlugified}`;
  }

  // Metadata slug from "description"
  if (file.slug) {
    slug = file.slug;
  }

  // Root
  if (slug === "") {
    slug = "/";
  }

  breadcrumb.push({
    name,
    slug,
  });

  return {
    name,
    breadcrumb,
    path,
    slug,
  };
};

const updateFile = ({ file, folder }: any) => {
  Object.assign(file, {
    exclude: false,
    page: true,
    index: file.name === "index",
    date: file.createdTime,
    ...folder.metadata,
  });

  // Transform description into metadata if description is YAML
  const metadata = getMetadataFromDescription(file.description);
  Object.assign(file, metadata);

  // Breadcrumb, slug, path
  Object.assign(file, getTreeMetadata(folder.tree, file));

  return file;
};

async function getGoogleDriveApi() {
  // const googleOAuth2 = new GoogleOAuth2({
  //   token: ENV_TOKEN_VAR,
  // });
  const auth = await getAuth();

  return google.drive({ version: "v3", auth });
}

/**
 * @typedef DocumentFetchParent
 * @property {string | null} id
 * @property {string[]} breadcrumb
 * @property {string} path
 */

/**
 * @typedef fetchGoogleDocumentsObjOptions
 * @property {import('googleapis').drive_v3.Drive} drive
 * @property {DocumentFetchParent[]} parents
 */

// 10 per 1.5 seconds.
const rateLimit = wait(10, 1500);
const BATCH_SIZE = 100;
/**
 * @param {import('../..').Options & fetchGoogleDocumentsObjOptions} options
 * @returns {Promise<(import('../..').DocumentFile & { path: string })[]>}
 */
async function fetchFromSubfolders({
  drive,
  parents,
  folder,
  debug,
}: any): Promise<any> {
  if (parents.length > BATCH_SIZE) {
    return _flatten(
      await Promise.all(
        evenlyChunk(parents, BATCH_SIZE).map((parents: any) =>
          fetchFromSubfolders({
            drive,
            parents,
            folder,
            debug,
          })
        )
      )
    );
  }

  const waited = await rateLimit();
  if (debug && waited > 1000) {
    const waitingTime = (waited / 1000).toFixed(1);
    console.info(`source-gdocs2md: rate limit reach. waiting ${waitingTime}s`);
  }

  const parentQuery =
    parents.length === 1 && parents[0].id === null
      ? false
      : parents.map((p: { id: any }) => `'${p.id}' in parents`).join(" or ");

  const query = {
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
    q: `${
      parentQuery ? `(${parentQuery}) and ` : ""
    }(mimeType='${MIME_TYPE_FOLDER}' or mimeType='${MIME_TYPE_DOCUMENT}') and trashed = false`,
    fields: `nextPageToken,files(id, mimeType, name, description, createdTime, modifiedTime, starred, parents)`,
  };

  const filesAndFolders = await drive.files.list(query);

  /** @param {typeof filesAndFolders.data.files} files */
  const collectDocuments = (files: any[]) =>
    files
      .filter(
        /** @returns {file is import("../..").DocumentFile} */
        (file: { mimeType: string }) => file.mimeType === MIME_TYPE_DOCUMENT
      )
      .map((file: { parents: Iterable<unknown> | null | undefined }) => {
        const parentIds = file.parents && new Set(file.parents);
        const folder =
          parentIds && parents.find((p: { id: any }) => parentIds.has(p.id));
        return updateFile({
          folder,
          file,
        });
      })
      .filter((file: { exclude: any }) => !file.exclude);
  let documents = collectDocuments(filesAndFolders.data.files);

  /** @param {typeof filesAndFolders.data.files} files */
  const collectParents = (files: any[]) => {
    return files
      .filter(
        (file: { mimeType: string }) => file.mimeType === MIME_TYPE_FOLDER
      )
      .map(
        (folder: {
          parents: Iterable<unknown> | null | undefined;
          description: any;
          name: any;
          id: any;
        }) => {
          const parentIds = folder.parents && new Set(folder.parents);
          const parent =
            parentIds && parents.find((p: { id: any }) => parentIds.has(p.id));
          const metadata = getMetadataFromDescription(folder.description);
          const tree = [
            ...parent.tree,
            {
              name: folder.name,
              skip: metadata.skip || false,
            },
          ];

          // we don't want to spread "skip" folder metadata to documents
          if (metadata.skip) {
            delete metadata.skip;
          }

          return {
            id: folder.id,
            tree,
            metadata: {
              ...parent.metadata,
              ...metadata,
            },
          };
        }
      )
      .filter((folder: any) => !folder.exclude);
  };
  let nextParents = collectParents(filesAndFolders.data.files);

  if (!filesAndFolders.data.nextPageToken) {
    if (nextParents.length === 0) {
      return documents;
    }
    const documentsInFolders = await fetchFromSubfolders({
      drive,
      parents: nextParents,
      folder,
      debug,
    });
    return [...documents, ...documentsInFolders];
  }

  /** @type {typeof documents} */
  let documentsInFolders: any[] = [];

  const fetchOneParentsBatch = async () => {
    // process one batch of children while continuing on with pages
    const parentBatch = nextParents.slice(0, BATCH_SIZE);
    nextParents = nextParents.slice(BATCH_SIZE);
    const results = await fetchFromSubfolders({
      drive,
      parents: parentBatch,
      folder,
      debug,
    });
    documentsInFolders = [...documentsInFolders, ...results];
  };

  /** @param {string} nextPageToken */
  const fetchNextPage = async (nextPageToken: any) => {
    await rateLimit();
    const nextRes = await drive.files.list({
      ...query,
      pageToken: nextPageToken,
    });
    documents = [...documents, ...collectDocuments(nextRes.data.files)];
    nextParents = [...nextParents, ...collectParents(nextRes.data.files)];

    if (!nextRes.data.nextPageToken) {
      if (nextParents.length === 0) {
        return documents;
      }
      const finalDocumentsInFolders = await fetchFromSubfolders({
        drive,
        parents: nextParents,
        folder,
        debug,
      });
      return [...documents, ...documentsInFolders, ...finalDocumentsInFolders];
    }

    const nextPagePromise: any = fetchNextPage(nextRes.data.nextPageToken);
    if (nextParents.length < BATCH_SIZE) {
      return nextPagePromise;
    }
    return (await Promise.all([nextPagePromise, fetchOneParentsBatch()]))[0];
  };
  return fetchNextPage(filesAndFolders.data.nextPageToken);
}

/** @param {import('../..').Options} customOptions */
async function fetchFromTopFolder({ folder, debug }: any) {
  const drive = await getGoogleDriveApi();
  const topFolderInfo = await drive.files.get({
    fileId: folder,
    fields: "name,description", // name is for debugging
    supportsAllDrives: true,
  });

  const documentsFiles = await fetchFromSubfolders({
    drive,
    parents: [
      {
        id: folder,
        tree: [],
        metadata: getMetadataFromDescription(topFolderInfo.data.description),
      },
    ],
    folder,
    debug,
  });

  return documentsFiles;
}

export {
  fetchFromTopFolder,
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
};
