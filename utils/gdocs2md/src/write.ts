import { getRoot } from "./utils";
import path from "path";
import fs from "fs";

export async function writeMarkdown(
  options: any,
  filename: any,
  markdown: any
) {
  await writeContent({
    targetDir: options.markdownDir,
    suffix: options.suffix,
    filename,
    extension: "md",
    content: markdown,
    options: options,
  });
}

async function writeContent({
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
  console.log("saving", file);
  const dir = path.dirname(file);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
  console.log("wrote", file);
}
