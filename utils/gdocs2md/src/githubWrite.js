const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const { GITHUB_TOKEN, GITHUB_NAME, GITHUB_EMAIL } = require("./constants.js");
console.log("GITHUB_TOKEN 2", GITHUB_TOKEN);

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

console.log("GITHUB_TOKEN 3", GITHUB_TOKEN);

async function writeToGitHub({
  owner,
  repo,
  path,
  githubName,
  email,
  message,
  content,
  branch,
}) {
  console.log("GITHUB_NAME", GITHUB_NAME, githubName, "x", GITHUB_TOKEN);
  const octokitValues = {
    owner: owner,
    repo: repo,
    path: path,
    message: message,
    content: Base64.encode(content),
    committer: {
      name: githubName,
      email: email,
    },
    branch,
  };
  const existingCommit = await octokit.repos
    .getContent({
      owner: owner,
      repo: repo,
      path: path,
      ref: branch,
    })
    .catch((error) => {
      console.log("Creating new file");
    });
  if (existingCommit) {
    console.log("Updating existing file", existingCommit);
    octokitValues.sha = existingCommit.data.sha;
    // octokitValues.sha = "fe0cc115c62c0d21439725b4020ad6fe64838d9b";
  }

  console.log("octokitValues", octokitValues);
  const data = await octokit.repos.createOrUpdateFileContents(octokitValues);
  console.log("data", data);
}

module.exports = { writeToGitHub };
