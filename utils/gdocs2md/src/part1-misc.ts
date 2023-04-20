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
}: any) {
  return {
    folder: folderId,
    markdownDir: path.join(root, subdir || ""),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    saveMarkdownToFile,
  };
}
