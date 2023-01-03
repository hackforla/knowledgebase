const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const { GITHUB_TOKEN, GITHUB_NAME, GITHUB_EMAIL } = require("./constants.js");

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function writeToFile({ owner, repo, path, message, content }) {
  const octokitValues = {
    owner: owner,
    repo: repo,
    path: path,
    message: message,
    content: Base64.encode(content + " " + Date.now()),
    committer: {
      name: GITHUB_NAME,
      email: GITHUB_EMAIL,
    },
  };
  const existingCommit = await octokit.repos
    .getContent({
      owner: owner,
      repo: repo,
      path: path,
    })
    .catch((error) => {
      console.log("debug error2", error);
    });
  if (existingCommit) {
    octokitValues.sha = existingCommit.data.sha;
  }

  const { data } = await octokit.repos.createOrUpdateFileContents(
    octokitValues
  );

  console.log(data);
}

module.exports = { writeToFile };
