const fs = require("fs-extra");
const path = require("path");
const _merge = require("lodash/merge");

const { fetchDocuments } = require("./google-docs");
const { DEFAULT_OPTIONS } = require("./constants");

exports.sourceGDocs2MD = async ({ actions: { reporter } }, pluginOptions) => {
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
    timer.setStatus("fetching");

    const googleDocuments = await fetchDocuments(options);

    timer.setStatus("creating nodes");

    for (let googleDocument of googleDocuments) {
      // console.log(googleDocument);
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

    timer.setStatus(googleDocuments.length + " markdown pages created");

    timer.end();

    return;
  } catch (e) {
    if (options.debug) {
      reporter.panic("source-gdocs2md: ", e);
    } else {
      reporter.panic(`source-gdocs2md: ${e.message}`);
    }
  }
};
