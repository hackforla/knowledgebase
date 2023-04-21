import json2md from "json2md";
import axios from "axios";
import { addDiv, normalizeElement } from "./part1-misc";
import fs from "fs";
import path from "path";

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

export async function downloadImageFromUrl(
  url: string,
  filename: string,
  callback: any
) {
  // const url = "https://unsplash.com/photos/AaEQmoufHLk/download?force=true";
  // TODO: try jpeg
  const dir = path.dirname(filename);

  fs.mkdirSync(dir, { recursive: true });
  // console.log("Downloading image", filename);
  const writer = fs.createWriteStream(filename);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

const checkFrontMatterAttribute = (attributeName: string, value: string) => {
  if (!attributeName) {
    return "";
  }
  return `${attributeName}: ${value || ""}\n`;
};

export const getFrontMatter = ({ gdoc, jsonData }: any, options: any) => {
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

export async function downloadImageFromURL(url: string, filename: string) {
  // const url = "https://unsplash.com/photos/AaEQmoufHLk/download?force=true";
  // TODO: try jpeg
  const dir = path.dirname(filename);

  fs.mkdirSync(dir, { recursive: true });
  // console.log("Downloading image", filename);
  const writer = fs.createWriteStream(filename);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

export function deriveMarkdown(gdoc: any, options: any) {
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
