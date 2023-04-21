const { createSignature, commitToString } = require("github-api-signature");

const privateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
71GxNrmCKiVZ5wnu
=JeBd
-----END PGP PRIVATE KEY BLOCK-----`;

const passphrase = "Iana1596.";

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
console.log("starting createSignature");
createSignature(commit, privateKey, passphrase).then((signature) => {
  //`-----BEGIN PGP SIGNATURE-----
  //
  // // Signature content
  //  -----END PGP SIGNATURE-----`;
  console.log("signature", signature);

  //   const apiPayload = {
  //     ...commit,
  //     signature,
  //   };

  // Use signature with GitHub API
  // https://developer.github.com/v3/git/commits/#create-a-commit
  // POST /repos/:owner/:repo/git/commits
});
console.log("done signature");

// Using a git-computed commit payload string
// commitToString returns the same format as "git cat-file -p <commit-sha>"
console.log("starting createSignature 2");
// const commitStr = commitToString(commit);
// createSignature(commitStr, privateKey, passphrase).then((signature) => {
//   console.log(signature);
// });
// console.log("done signature 2");
