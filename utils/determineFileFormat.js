const { StringDecoder } = require("string_decoder");
const decoderHex = new StringDecoder("hex");

function determineFileFormat(buff, isVideo = false) {
  let fileSignature = decoderHex.write(buff.slice(0, 2));

  if (isVideo) {
    fileSignature = decoderHex.write(buff.slice(4, 12));
  }

  switch (fileSignature) {
    case "ffd8":
      return ".jpg";
    case "8950":
      return ".png";
    case "4749":
      return ".gif";
    case "6674797069736f6d":
      return ".mp4";
    default:
      return "Invalid file type.";
  }
}

module.exports = {
  determineFileFormat,
};
