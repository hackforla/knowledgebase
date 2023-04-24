import { getRoot } from "./utils";
import path from "path";
import fs from "fs";
import { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";
import {
  FILE_PREFIX,
  GITHUB_TOKEN,
  GITHUB_BRANCH,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_EMAIL,
  GITHUB_NAME,
  GITHUB_COMMIT_MESSAGE,
} from "./constants";

export async function writeMarkdown(
  options: any,
  filename: any,
  markdown: any
) {
  await writeContentToFile({
    targetDir: options.markdownDir,
    suffix: options.suffix,
    filename,
    extension: "md",
    content: markdown,
    options: options,
  });
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export async function saveMarkdown(
  filename: string,
  options: { saveMarkdownToFile: any; saveMarkdownToGitHub: any; suffix: any },
  markdown: string,
  phase_name: any
) {
  console.log("saveMarkdown", filename);
  filename = filename.startsWith("/")
    ? filename.substring(1) // remove leading slash
    : filename || "";
  if (filename.indexOf("/") > -1) {
    filename = filename.startsWith(FILE_PREFIX)
      ? filename
      : FILE_PREFIX + filename; // add leading underscore
  }

  if (options.saveMarkdownToFile) {
    await writeMarkdown(options, filename, markdown);
  }
  if (options.saveMarkdownToGitHub) {
    let githubFile = `${filename ? filename : "index"}${options.suffix}.md`;
    console.log("about to save to github", githubFile);
    await saveToGitHub({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      email: GITHUB_EMAIL,
      githubName: GITHUB_NAME,
      path: githubFile,
      message: GITHUB_COMMIT_MESSAGE,
      content: markdown,
      phase_name,
    });
    console.log("done saving to github");
  }
}

async function saveToGitHub({
  owner,
  repo,
  path,
  githubName,
  email,
  message,
  content,
  phase_name,
}: any) {
  if (path.includes("subdir")) {
    console.log("skipping subdir");
    return;
  }
  console.log("saveToGitHub start", path);
  const branch = GITHUB_BRANCH.hasOwnProperty(phase_name)
    ? GITHUB_BRANCH[phase_name.toLowerCase()]
    : GITHUB_BRANCH.default;
  const octokitValues = {
    owner: owner,
    repo: repo,
    path: path,
    message: message,
    content: Base64.encode(content + " " + new Date().toISOString()),
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
    .catch(() => {
      console.log("Creating new file");
    });
  console.log("here");
  if (existingCommit) {
    const existingData = existingCommit.data as any;
    // @ts-ignore
    octokitValues.sha = existingCommit.data.sha;
    // @ts-ignore
    console.log("Updating existing file", octokitValues.sha);
  }
  // @ts-ignore
  console.log("octokit start", path, octokitValues.sha);
  console.log("GITHUB_TOKEN", GITHUB_TOKEN);
  await octokit.repos.createOrUpdateFileContents(octokitValues);
  console.log("octokit end", path);
  console.log("okay");
}

export async function writeContentToFile({
  content,
  targetDir,
  filename,
  suffix,
  extension,
}: any) {
  // todo: make location to write dependent on phase (draft, etc)
  // todo: create a map for status to google folder id
  //${targetDir}/${filename}${suffix}.${extension
  let file = path.join(
    targetDir,
    `${filename ? filename : "index"}${suffix}.${extension}`
  );
  if (file.startsWith("<root>")) {
    file = file.replace("<root>", getRoot());
  }
  console.log("writing", file);
  const dir = path.dirname(file);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
  console.log("wrote", file);
}
