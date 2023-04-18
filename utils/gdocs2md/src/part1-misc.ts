export function getRoot() {
  let root = process.argv[1];
  root = root.substring(0, root.lastIndexOf("/gdocs2md")) + "/gdocs2md";
  return root;
}
