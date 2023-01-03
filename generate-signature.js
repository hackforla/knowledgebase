import { createSignature, commitToString } from "github-api-signature";

const privateKey: string = `-----BEGIN PGP PRIVATE KEY BLOCK-----
// Private key content //
-----END PGP PRIVATE KEY BLOCK-----`;

const passphrase = "my secret phrase";

const commit = {
  message: "Commit message",
  tree: "tree-sha",
  parents: ["parent-sha"],
  author: {
    name: "John Doe",
    email: "ghost@github.com",
    date: "2018-01-01T00:00:00.000Z",
  },
  // Optional committer informations
  // Defaults to <author>
  committer: {
    name: "Dohn Joe",
    email: "github@ghost.com",
    date: "2018-01-01T00:00:00.000Z",
  },
};

// Using a CommitPayload object
createSignature(commit, privateKey, passphrase).then((signature: string) => {
  // signature = `-----BEGIN PGP SIGNATURE-----
  //
  // // Signature content
  // -----END PGP SIGNATURE-----`;

  const apiPayload = {
    ...commit,
    signature,
  };

  // Use signature with GitHub API
  // https://developer.github.com/v3/git/commits/#create-a-commit
  // POST /repos/:owner/:repo/git/commits
});

// Using a git-computed commit payload string
// commitToString returns the same format as "git cat-file -p <commit-sha>"
const commitStr = commitToString(commit);
createSignature(commitStr, privateKey, passphrase).then((signature) => {
  console.log(signature);
});
