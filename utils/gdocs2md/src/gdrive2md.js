const fs = require("fs-extra");
const path = require("path");
const _merge = require("lodash/merge");

const {
  fetchGoogleDocObjs,
} = require("../../googleoauth2-utils/src/google-docs");
const { DEFAULT_OPTIONS } = require("./constants");
const { ElementsOfGoogleDocument } = require("./elements-of-google-document");

// todo: get this to work so uses new code
exports.gdrive2md = async ({ actions: { reporter } }, pluginOptions) => {
  const options = _merge({}, DEFAULT_OPTIONS, pluginOptions);
  const timer = reporter.activityTimer(`source-gdocs2md`);

  timer.start();

  try {
    const gdocs = await fetchGoogleDocObjs(options);
    let x = 0;
    for (let gdoc of gdocs) {
      gdocs[x] = new ElementsOfGoogleDocument({ ...gdoc });
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
          options.targetMarkdownDir,
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
