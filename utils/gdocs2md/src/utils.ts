import path from "path";
export function addDiv(markdown: string, options: any) {
  const a = options.skipDiv
    ? markdown
    : '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
      markdown +
      "</div>\n</div>";
  return a;
}

type arrayTypeHash = {
  array: any[];
  keyProperty: string;
  valueProperty?: string;
  hashProperty?: string;
};
export function arrayToHash({ array, keyProperty }: arrayTypeHash) {
  const hash = {} as any;
  array.forEach((item) => {
    const key = item[keyProperty];
    hash[key] = item;
  });
  return hash;
}

export function getRoot() {
  let root = process.argv[1];
  root = root.substring(0, root.lastIndexOf("/gdocs2md")) + "/gdocs2md";
  return root;
}

export const normalizeElement: any = (element: any) => {
  if (element.type && element.value) {
    return { [element.type]: normalizeElement(element.value) };
  }

  if (Array.isArray(element)) {
    return element.map(normalizeElement);
  }

  return element;
};

export function getPluginOptions({
  folderId,
  root,
  subdir,
  suffix,
  saveGdoc,
  saveMarkdownToFile,
  saveMarkdownToGitHub,
}: any) {
  return {
    folder: folderId,
    markdownDir: path.join(root || "", subdir || ""),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    saveMarkdownToFile,
    saveMarkdownToGitHub,
  };
}
