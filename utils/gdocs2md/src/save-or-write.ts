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
    outputdir: options.outputdir,
    suffix: options.suffix,
    filename,
    extension: options.extension || "md",
    content: markdown,
    options: options,
  });
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export async function saveMarkdown(
  filename: string,
  options: {
    outputdir: string;
    savemarkdowntofile: any;
    savemarkdowntogithub: any;
    suffix: any;
  },
  markdown: string,
  phase_name: any
) {
  if (options.savemarkdowntofile) {
    await writeMarkdown(options, filename, markdown);
  }
  if (options.savemarkdowntogithub) {
    let githubFile = `${filename ? filename : "index"}${options.suffix}.md`;
    await saveToGitHub({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      outputdir: options.outputdir,
      email: GITHUB_EMAIL,
      githubName: GITHUB_NAME,
      filename: githubFile,
      message: GITHUB_COMMIT_MESSAGE,
      content: markdown,
      phase_name,
    });
  }
}

async function saveToGitHub({
  owner,
  repo,
  outputdir,
  filename,
  githubName,
  email,
  message,
  content,
  phase_name,
}: any) {
  let githubFile = path.join(outputdir, filename);
  if (githubFile.startsWith("/")) {
    githubFile = githubFile.substring(1);
  }
  if (githubFile.includes("subdir")) {
    return;
  }
  const branch = GITHUB_BRANCH.hasOwnProperty(phase_name)
    ? GITHUB_BRANCH[phase_name.toLowerCase()]
    : GITHUB_BRANCH.default;
  const octokitValues = {
    owner: owner,
    repo: repo,
    path: githubFile,
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
      path: githubFile,
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
  await octokit.repos.createOrUpdateFileContents(octokitValues);
  console.log("done saving to github");
}

export async function writeContentToFile({
  content,
  outputdir,
  filename,
  suffix,
  extension,
}: any) {
  // todo: make location to write dependent on phase (draft, etc)
  // todo: create a map for status to google folder id
  //${outputdir}/${filename}${suffix}.${extension
  let file = path.join(
    outputdir,
    `${filename ? filename : "index"}${suffix || ""}.${extension}`
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
