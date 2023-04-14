let { google } = require("googleapis");
let privatekey = require("./privatekey.json");
let driveId = "1nnQhhhwk_OS1z_O9qPC-NT1z7BY2ugdr";
// configure a JWT auth client
let jwtClient = newFunction();
const auth = jwtClient;
let drive = google.drive("v3", auth);
// doStuff();
console.log("xxxxxxx");
xyz();

function newFunction() {
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ["https://www.googleapis.com/auth/drive"]
  );
  //authenticate request
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
  });
  return jwtClient;
}

function doStuff() {
  drive.files.list(
    {
      auth: jwtClient,
      fileId: "1GwLKyd_oH6N5H-Opnq-GeR_51fTRLhDa",
    },
    function (err, response) {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      var files = response.data.files;
      if (files.length == 0) {
        console.log("No files found.");
      } else {
        console.log("Files from Google Drive:");
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log("%s (%s)", file.name, file.id);
        }
      }
    }
  );
}

async function xyz() {
  const folder = "1GwLKyd_oH6N5H-Opnq-GeR_51fTRLhDa";
  const res = await drive.files.get({
    fileId: folder,
    supportsAllDrives: true,
  });
  console.log("res", res, res.data.name);
}
