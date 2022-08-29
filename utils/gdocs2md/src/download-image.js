var fs = require("fs"),
  axios = require("axios"),
  http = require("http"),
  https = require("https");

var path = require("path");

var downloadImageFromURL = async (url, dir, filename, callback) => {
  // const url = "https://unsplash.com/photos/AaEQmoufHLk/download?force=true";
  // TODO: try jpeg
  fs.mkdirSync(dir, { recursive: true });
  const fullFilename = path.join(dir, filename + "-gdocs.png");
  console.log("image dir", fullFilename);
  const writer = fs.createWriteStream(fullFilename);

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
