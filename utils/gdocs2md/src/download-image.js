var fs = require("fs"),
  axios = require("axios"),
  http = require("http"),
  https = require("https");

var path = require("path");
var request = require("request");

var Stream = require("stream").Transform;

// Download Image Helper Function
// var downloadImageFromURL = async (uri, filename, callback) => {
// request.head(uri, function (err, res, body) {
//   console.log("content-type:", res.headers["content-type"]);
//   console.log("content-length:", res.headers["content-length"]);
//   request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
// }); //   var dest = fs.createWriteStream(fileName);
//   var imageData = await drive.files.get({
//     fileId: fileId,
//     alt: "media",
//   });
//   fs.writeFileSync(path.join(process.cwd(), filename), imageData);
// .on("end", function () {
//   console.log("Done");
// })
// .on("error", function (err) {
//   console.log("Error during download", err);
// })
// .pipe(dest);
// };

var httpdownloadImageFromURL = async (url, filename, callback) => {
  //   var client = http;
  //   console.log("image url", url);
  //   if (url.toString().indexOf("https") === 0) {
  //     client = https;
  //   }
  //   client
  //     .request(url, function (response) {
  //       var data = "";
  //       response.on("data", function (chunk) {
  //         data += chunk;
  //       });
  //       response.on("end", function () {
  //         console.log("running callback", process.cwd(), filename);
  //         if (data) {
  //           fs.writeFileSync(path.join(process.cwd(), filename), data);
  //         }
  //       });
  //     })
  //     .end();
};

var downloadImageFromURL = async (url, filename, callback) => {
  // const url = "https://unsplash.com/photos/AaEQmoufHLk/download?force=true";
  const dir = path.join(__dirname, "axios-" + filename + ".png");
  const writer = fs.createWriteStream(dir);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

module.exports = { downloadImageFromURL };
