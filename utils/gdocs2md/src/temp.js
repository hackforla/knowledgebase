const fs = require("fs");
const path = require("path");
const pkg = require("lodash");
const { merge: _merge } = pkg;
const {
  fetchGoogleDocObjs,
} = require("../../googleoauth2-utils/src/google-docs.js");
const { convertGdoc2ElementsObj, convertElements2MD } = require("./convert.js");
const { jekyllifyFrontMatter } = require("./utils.js");
const { DEFAULT_OPTIONS } = require("./constants.js");
// TODO: add to constants

const jekyllifyDocs = async (pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const gdocs = await filterGoogleDocs(options);
  const processMarkdown = options.saveMarkdown;
  const processElements = options.saveElements || processMarkdown;
  let x = 0;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // while (x < gdocs.length) {
  //   console.log("x", x);
  //   await new Promise((resolve) => {
  //     throw new Error("x counter error");
  //   });
  //   x++;
  //   console.log("error");
  // }

  arr.forEach(async (x) => {
    console.log("x", x);
    // try {
    await new Promise((resolve) => {
      console.log("about to throw inside promise", x);
      throw new Error("forEach counter error");
    });
    // } catch (e) {
    //   console.log("error in loop");
    // }
    x++;
    console.log("error", x);
    throw new Error("uh oh");
  });
  throw new Error("out of loop");

  gdocs.forEach(async (gdoc) => {
    let gdocElementsObj = {};
    let markdown = "";

    const { document } = gdoc;
    console.log("Processing document", document.title);
    if (options.saveJson) {
      writeGdoc(options, document);
    }

    if (processElements) {
      console.log("about to convert gdoc to elements");
      try {
        throw new Error("an error");
      } catch (e) {
        console.log("error", e);
      }
      gdocElementsObj = await convertGdoc2ElementsObj({ gdoc: document });
      console.log("converted gdoc to elements");
      if (options.saveJson) {
        writeGdocElementsObj(options, gdocObj, gdocElementsObj);
      }
    }

    if (processMarkdown) {
      markdown = await convertElements2MD(googleDocObj.elements);
      markdown = jekyllifyFrontMatter(googleDocObj, markdown);
      if (options.saveMarkdown) {
        writeMarkdown(options, gdocObj, markdown);
      }
    }
  });
};

function writeMarkdown(options, properties, markdown) {
  writeContent({
    target: options.targetMarkdownDir,
    suffix: options.suffix,
    filename: properties.path,
    extension: "md",
    content: markdown,
  });
}

function writeGoogleDoc(options, properties, gdoc) {
  writeContent({
    target: options.targetGdocJson,
    suffix: options.suffix,
    filename: properties.path,
    extension: "json",
    content: JSON.stringify(gdoc),
  });
}

async function filterGoogleDocs(options) {
  let gdocs = await fetchGoogleDocObjs(options);
  // TODO: change to use more standard -- prefix (--var value) instead of split =
  if (options.matchPattern) {
    gdocs = gdocs.filter(({ content: document }) => {
      return document.title.toLowerCase().includes(matchPattern.toLowerCase());
    });
  }
  return gdocs;
}

function getParamValues() {
  const paramValues = {};
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    paramValues[key.toLowerCase()] = value;
  });
  return paramValues;
}

const jsonifyDocs = async (pluginOptions) => {
  const options = _merge(
    { saveMarkdown: false, saveJson: true },
    DEFAULT_OPTIONS,
    pluginOptions
  );
  await jekyllifyDocs(options);
};

function writeContent({ content, filename, target, suffix, extension }) {
  const file = path.join(
    target,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  // console.log("writing", file, "x", filename);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
}

module.exports = { getParamValues, jekyllifyDocs, jsonifyDocs };
