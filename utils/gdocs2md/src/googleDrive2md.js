const fs = require("fs-extra");
const path = require("path");
const _merge = require("lodash/merge");

const {
  fetchDocuments,
} = require("../../getGdocsTokenAndFetch/src/google-docs");
const { DEFAULT_OPTIONS } = require("./constants");
const { ElementsOfGoogleDocument } = require("./elements-of-google-document");

exports.googleDrive2MD = async ({ actions: { reporter } }, pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);

  if (!options.folder) {
    if (options.folders && options.folders.length > 0) {
      reporter.warn(
        `source-gdocs2md: "folders" option will be deprecated in the next version, please use "folder" option instead`
      );
      Object.assign(options, {
        folder: options.folders[0],
      });
    } else {
      reporter.warn(`source-gdocs2md: Missing "folder" option`);
      return;
    }
  }

  const timer = reporter.activityTimer(`source-gdocs2m`);

  timer.start();

  try {
    const googleDocuments = await fetchDocuments(options);
    let x = 0;
    for (let googleDocument of googleDocuments) {
      googleDocuments[x] = new ElementsOfGoogleDocument({
        document: googleDocument.document,
        properties: googleDocument.properties,
        options: options,
        links: googleDocument.links,
        options: googleDocument.options,
        links: googleDocument.links,
      });
      x++;
    }
    timer.setStatus("fetched");
    for (let googleDocument of googleDocuments) await googleDocument.process();
    timer.setStatus("processsed");

    for (let googleDocument of googleDocuments) {
      const { properties } = googleDocument;
      const markdown = googleDocument.toMarkdown();

      fs.outputFileSync(
        path.join(
          options.target,
          `${properties.path ? properties.path : "index"}.md`
        ),
        markdown
      );
    }
    timer.setStatus("written");

    console.log(googleDocuments.length + " markdown pages created");
    return;
  } catch (e) {
    if (options.debug) {
      reporter.panic("source-gdocs2md: ", e);
    } else {
      reporter.panic(`source-gdocs2md: ${e.message}`);
    }
  }
};
