import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./part1-google-funcs";
import { GdocObj } from "./part1-gdoc-obj";
import * as json2md from "./part1-json2md-extended";
import { normalizeElement } from "./part1-misc");

import { writeMarkdown } from "./part1-write";
import axios from "axios";

import { fetchGoogleDocJson } from "./part1-google-docs-funcs";

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

function addDiv(markdown: string, options: any) {
  const a = options.skipDiv
    ? markdown
    : '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
      markdown +
      "</div>\n</div>";
  return a;
}

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

async function fetchAndSetContent(gdocs: any) {
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

export async function fetchGdocCustomProperties(id: string, name: string) {
  const url = `http://localhost:8000/gdocs/get/${id}`;
  const response = (await axios({
    url,
    method: "GET",
  }).catch((error) => {
    console.warn(
      "*** WARNING ***",
      name,
      id,
      "not registered.  Error:",
      error.message
    );
    return {};
  })) as any;
  return response.data || {};
}

const getFrontMatter = ({ gdoc, jsonData }: any, options: any) => {
  const metaData = jsonData || {};
  const isActive = metaData.active || metaData.active === undefined;
  gdoc.properties.status = isActive ? "active" : "inactive";
  // todo: all hard coded scripts should be dynamic
  const frontmatterJson = {
    title: metaData.title || gdoc.properties.title,
    description: metaData.description || gdoc.properties.description || "",
    "short-description": metaData.short_description || "",
    "card-type": metaData.card_type || "guide-page",
    status: metaData.status || "active",
    display: "true",
    "provider-link": gdoc.properties.slug + options.suffix,
    phase: metaData.phase || "dev",
    svg: metaData.svg || "svg/2FA.svg",
    category: "",
  };

  const attributeValuePairs = [
    ["title", frontmatterJson.title],
    ["description", frontmatterJson.description || ""],
    ["short-description", frontmatterJson["short-description"], ""],
    ["card-type", frontmatterJson["card-type"] || "guide-page"],
    ["status", "active"],
    ["display", true],
    ["category", frontmatterJson["category"] || "Development"],
    // ["phase", "pending"],
    // todo: change below to be dyname
    ["svg", "svg/2FA.svg"],
    ["provider-link", gdoc.properties.slug + options.suffix],
    gdoc.cover ? ["cover", gdoc.cover] : [],
  ];
  let frontMatter = "";
  attributeValuePairs.forEach(([attributeName, value]) => {
    frontMatter += checkFrontMatterAttribute(attributeName, value);
  });

  return `---\n${frontMatter}---\n`;
};

const checkFrontMatterAttribute = (attributeName: string, value: string) => {
  if (!attributeName) {
    return "";
  }
  return `${attributeName}: ${value || ""}\n`;
};

function deriveMarkdown(gdoc: any, options: any) {
  const jsonOfElements = gdoc.elements.map((element: any) =>
    normalizeElement(element)
  );
  let markdown = json2md(jsonOfElements);
  markdown = addDiv(markdown, options);
  let jsonData = {} as any;

  const frontMatter = options.skipFrontMatter
    ? ""
    : getFrontMatter(
        {
          gdoc: gdoc,
          cover: gdoc.cover,
          jsonData,
        },
        options
      );
  markdown = frontMatter + markdown;
  let filename = jsonData.slug || gdoc.properties.path;
  return { filename, markdown, phase_name: jsonData.phase_name || "" };
}

export {
  arrayToHash,
  deriveMarkdown,
  fetchAndSetContent,
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
