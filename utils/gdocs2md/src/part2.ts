import {
  getGoogleDriveApi,
  fetchFromSubfolders,
  getMetadataFromDescription,
} from "./google-drive";
const json2md = require("json2md");
const { normalizeElement } = require("./normalize-element");

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

function addDiv(markdown: string, options: any) {
  return options.skipDiv
    ? markdown
    : '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
        markdown +
        "</div>\n</div>";
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

async function fetchAndSetContent(gdocObjs: any) {
  const keys = Object.keys(gdocObjs);
  await Promise.all(
    keys.map(async (key) => {
      const content = await fetchGoogleDocJson(key);
      gdocObjs[key].content = content;
    })
  );
}

async function deriveAndSaveMarkdowns(gdocObjs: any, options: any) {
  const keys = Object.keys(gdocObjs);
  console.log("options", options);
  await Promise.all(
    keys.map(async (key) => {
      const gdoc = gdocObjs[key];
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
      }
    })
  );
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
};
