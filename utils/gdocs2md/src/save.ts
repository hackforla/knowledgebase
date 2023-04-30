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
import { ifiledata } from "./ifiledata";
import { ioptions } from "./ioptions";

export async function saveMarkdownToFile(
  filedata: ifiledata,
  options: ioptions
) {
  filedata.extension = filedata.extension || "md";
  await saveContentToFile(filedata, options);
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export async function saveMarkdown(filedata: any, options: any) {
  if (options.savemarkdowntofile) {
    await saveContentToFile(filedata, options);
  }
  if (options.savemarkdowntogithub) {
    let githubFile = `${filedata.filename ? filedata.filename : "index"}${
      options.suffix
    }.md`;
    await saveToGitHub(
      filedata,
      {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        email: GITHUB_EMAIL,
        githubName: GITHUB_NAME,
        message: GITHUB_COMMIT_MESSAGE,
      },
      options
    );
  }
}

async function saveToGitHub(
  filedata: ifiledata,
  config: {
    owner: string;
    repo: string;
    githubName: string;
    email: string;
    message: string;
  },
  options: ioptions
) {
  let githubFile =
    path.join(options.outputdir, filedata.filename) + "." + filedata.extension;
  if (githubFile.startsWith("/")) {
    githubFile = githubFile.substring(1);
  }
  const phase_name = filedata.branch || "default";
  const branch = GITHUB_BRANCH.hasOwnProperty(phase_name)
    ? GITHUB_BRANCH[phase_name.toLowerCase()]
    : GITHUB_BRANCH.default;
  const octokitValues = {
    owner: config.owner,
    repo: config.repo,
    path: githubFile,
    message: config.message,
    content: Base64.encode(filedata.content + " " + new Date().toISOString()),
    committer: {
      name: config.githubName,
      email: config.email,
    },
    branch,
  };
  const existingCommit = await octokit.repos
    .getContent({
      owner: config.owner,
      repo: config.repo,
      path: githubFile,
      ref: branch,
    })
    .catch(() => {
      console.log("Creating new file");
    });
  console.log("Processing", githubFile);
  if (existingCommit) {
    // @ts-ignore
    octokitValues.sha = existingCommit.data.sha;
    // @ts-ignore
    console.log("Updating existing file", octokitValues.sha);
  }
  await octokit.repos.createOrUpdateFileContents(octokitValues);
  console.log("done saving to github");
}

export async function saveContentToFile(
  filedata: ifiledata,
  options: ioptions
) {
  // todo: make location to write dependent on phase (draft, etc)
  // todo: create a map for status to google folder id
  //${outputdir}/${filename}${suffix}.${extension
  let { outputdir, suffix } = options;
  let { filename, extension, content } = filedata;
  let filespec = path.join(
    outputdir,
    `${filename ? filename : "index"}${suffix || ""}.${extension}`
  );
  if (filespec.startsWith("<root>")) {
    filespec = filespec.replace("<root>", getRoot());
  }
  console.log("writing", filespec);
  const dir = path.dirname(filespec);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filespec, content);
  console.log("wrote", filespec);
}
