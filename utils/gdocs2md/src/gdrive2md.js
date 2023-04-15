const fs = require("fs-extra");
const path = require("path");
const _merge = require("lodash/merge");

const {
  fetchGdocsDetails,
} = require("../../googleoauth2-utils/src/google-docs");
const { DEFAULT_OPTIONS } = require("./constants");
const { ElementsOfGoogleDocument } = require("./elements-of-google-document");

// todo: ?? get this to work so uses new code
exports.gdrive2md = async ({ actions: { reporter } }, pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const timer = reporter.activityTimer(`source-gdocs2md`);

  timer.start();

  try {
    const gdocs = await fetchGdocsDetails({
      folder: options.folder,
      debug: options.debug,
    });
    let x = 0;
    for (let gdoc of gdocs) {
      gdocs[x] = new ElementsOfGoogleDocument({
        document: gdoc.document,
        options: gdoc.options,
        properties: gdoc.properties,
        links: gdoc.links,
      });
      x++;
    }
    timer.setStatus("fetched");
    for (let gdoc of gdocs) {
      await gdoc.process();
    }
    timer.setStatus("processsed");

    for (let gdoc of gdocs) {
      const { properties } = gdoc;
      const markdown = gdoc.toMarkdown();

      fs.outputFileSync(
        path.join(
          options.markdownDir,
          `${properties.path ? properties.path : "index"}.md`
        ),
        markdown
      );
    }
    timer.setStatus("written");
    return;
  } catch (e) {
    if (options.debug) {
      reporter.panic("source-gdocs2md: ", e);
    } else {
      reporter.panic(`source-gdocs2md: ${e.message}`);
    }
  }
};
