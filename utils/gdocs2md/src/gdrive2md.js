const fs = require("fs-extra");
const path = require("path");
const _merge = require("lodash/merge");

const {
  fetchDocuments,
} = require("../../getGdocsTokenAndFetch/src/google-docs");
const { DEFAULT_OPTIONS } = require("./constants");
const { ElementsOfGoogleDocument } = require("./elements-of-google-document");

exports.gdrive2md = async ({ actions: { reporter } }, pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const timer = reporter.activityTimer(`source-gdocs2m`);

  timer.start();

  try {
    const googleDocuments = await fetchDocuments(options);
    let x = 0;
    for (let googleDocument of googleDocuments) {
      googleDocuments[x] = new ElementsOfGoogleDocument({ ...googleDocument });
      x++;
    }
    timer.setStatus("fetched");
    for (let googleDocument of googleDocuments) {
      await googleDocument.process();
    }
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
